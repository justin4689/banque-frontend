

import { useQuery } from "@tanstack/react-query";
import { profile } from "../../lib/action/auth.action";

export const useProfile = () =>
    useQuery({
      queryKey: ['profile'],
      queryFn: profile,
    })