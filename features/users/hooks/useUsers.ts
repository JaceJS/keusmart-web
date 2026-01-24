import { useState, useEffect, useCallback } from "react";
import { userService } from "../services/user.service";
import type { TeamMember, UserParams } from "../types/user.types";
import type { PaginatedMeta } from "@/core/api/client";

export function useUsers(initialParams: UserParams = {}) {
  const [data, setData] = useState<TeamMember[]>([]);
  const [meta, setMeta] = useState<PaginatedMeta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async (params: UserParams = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, meta } = await userService.getUsers(params);

      setData(data);
      setMeta(meta);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data anggota tim");
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    fetchUsers(initialParams);
  }, [fetchUsers, initialParams]);

  useEffect(() => {
    fetchUsers(initialParams);
  }, [JSON.stringify(initialParams)]);

  return { data, meta, isLoading, error, fetchUsers, refetch };
}
