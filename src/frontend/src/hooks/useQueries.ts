import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type {
  AppInfo,
  UserProfile,
  FounderProfile,
  ShoppingItem,
  ImplementationLibrary,
  StressTestMetrics,
} from '../backend';

export function useGetApps() {
  const { actor, isFetching } = useActor();

  return useQuery<AppInfo[]>({
    queryKey: ['apps'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getApps();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetFounderProfile() {
  const { actor, isFetching } = useActor();

  return useQuery<FounderProfile>({
    queryKey: ['founderProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getFounderProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateCheckoutSession() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      items,
      successUrl,
      cancelUrl,
    }: {
      items: ShoppingItem[];
      successUrl: string;
      cancelUrl: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createCheckoutSession(items, successUrl, cancelUrl);
    },
  });
}

export function useIsStripeConfigured() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['stripeConfigured'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isStripeConfigured();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetImplementationLibrary() {
  const { actor, isFetching } = useActor();

  return useQuery<ImplementationLibrary>({
    queryKey: ['implementationLibrary'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getImplementationLibrary();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRunStressTest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<StressTestMetrics> => {
      if (!actor) throw new Error('Actor not available');
      return actor.runStressTest();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lastStressTestResults'] });
    },
  });
}

export function useGetLastStressTestResults() {
  const { actor, isFetching } = useActor();

  return useQuery<StressTestMetrics | null>({
    queryKey: ['lastStressTestResults'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getLastStressTestResults();
    },
    enabled: !!actor && !isFetching,
  });
}
