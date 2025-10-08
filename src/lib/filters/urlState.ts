'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { SearchFilters } from '../types';

export function useUrlState() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const getFilters = useCallback((): SearchFilters => {
    const params = new URLSearchParams(searchParams);
    
    return {
      query: params.get('q') || undefined,
      services: params.get('services')?.split(',').filter(Boolean) || [],
      industries: params.get('industries')?.split(',').filter(Boolean) || [],
      countries: params.get('countries')?.split(',').filter(Boolean) || [],
      ratingMin: params.get('ratingMin') ? Number(params.get('ratingMin')) : undefined,
      ratingMax: params.get('ratingMax') ? Number(params.get('ratingMax')) : undefined,
      priceMin: params.get('priceMin') ? Number(params.get('priceMin')) : undefined,
      priceMax: params.get('priceMax') ? Number(params.get('priceMax')) : undefined,
      verified: params.get('verified') === 'true' ? true : params.get('verified') === 'false' ? false : undefined,
      foundedYearMin: params.get('foundedYearMin') ? Number(params.get('foundedYearMin')) : undefined,
      foundedYearMax: params.get('foundedYearMax') ? Number(params.get('foundedYearMax')) : undefined,
      employeeCount: params.get('employeeCount')?.split(',').filter(Boolean) || [],
      sort: params.get('sort') || 'rating_desc',
      page: params.get('page') ? Number(params.get('page')) : 1,
      limit: params.get('limit') ? Number(params.get('limit')) : 12,
    };
  }, [searchParams]);

  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    const params = new URLSearchParams(window.location.search);

    // Reset page when filters change (except when updating page itself)
    if (!('page' in newFilters)) {
      params.set('page', '1');
    }

    // Update URL parameters
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        params.delete(key);
      } else if (Array.isArray(value)) {
        if (value.length > 0) {
          params.set(key, value.join(','));
        } else {
          params.delete(key);
        }
      } else {
        params.set(key, String(value));
      }
    });

    // Update URL
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  }, [router]);

  const setFilter = useCallback((key: keyof SearchFilters, value: any) => {
    updateFilters({ [key]: value });
  }, [updateFilters]);

  const updateFilter = useCallback((key: keyof SearchFilters, value: any) => {
    updateFilters({ [key]: value });
  }, [updateFilters]);

  const removeFilter = useCallback((key: keyof SearchFilters) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  }, [router, searchParams]);

  const clearAllFilters = useCallback(() => {
    const params = new URLSearchParams();
    params.set('sort', 'rating_desc');
    params.set('page', '1');
    params.set('limit', '12');
    
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  }, [router]);

  const addArrayFilter = useCallback((key: keyof SearchFilters, value: string) => {
    const params = new URLSearchParams(window.location.search);
    const currentValue = params.get(key);
    const currentArray = currentValue ? currentValue.split(',').filter(Boolean) : [];
    
    if (!currentArray.includes(value)) {
      const newArray = [...currentArray, value];
      params.set(key, newArray.join(','));
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      router.push(newUrl, { scroll: false });
    }
  }, [router]);

  const removeArrayFilter = useCallback((key: keyof SearchFilters, value: string) => {
    const params = new URLSearchParams(window.location.search);
    const currentValue = params.get(key);
    const currentArray = currentValue ? currentValue.split(',').filter(Boolean) : [];
    
    const newArray = currentArray.filter(item => item !== value);
    if (newArray.length > 0) {
      params.set(key, newArray.join(','));
    } else {
      params.delete(key);
    }
    
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  }, [router]);

  const toggleArrayFilter = useCallback((key: keyof SearchFilters, value: string) => {
    const params = new URLSearchParams(window.location.search);
    const currentValue = params.get(key);
    const currentArray = currentValue ? currentValue.split(',').filter(Boolean) : [];
    
    if (currentArray.includes(value)) {
      const newArray = currentArray.filter(item => item !== value);
      if (newArray.length > 0) {
        params.set(key, newArray.join(','));
      } else {
        params.delete(key);
      }
    } else {
      const newArray = [...currentArray, value];
      params.set(key, newArray.join(','));
    }
    
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  }, [router]);

  const filters = useMemo(() => getFilters(), [getFilters]);

  return {
    filters,
    updateFilters,
    setFilter,
    updateFilter,
    removeFilter,
    clearAllFilters,
    addArrayFilter,
    removeArrayFilter,
    toggleArrayFilter,
  };
}

// Helper functions for working with URL state
export function createFilterUrl(basePath: string, filters: SearchFilters): string {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          params.set(key, value.join(','));
        }
      } else {
        params.set(key, String(value));
      }
    }
  });
  
  const queryString = params.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

export function parseFilterUrl(searchParams: URLSearchParams): SearchFilters {
  return {
    query: searchParams.get('q') || undefined,
    services: searchParams.get('services')?.split(',').filter(Boolean) || [],
    industries: searchParams.get('industries')?.split(',').filter(Boolean) || [],
    countries: searchParams.get('countries')?.split(',').filter(Boolean) || [],
    ratingMin: searchParams.get('ratingMin') ? Number(searchParams.get('ratingMin')) : undefined,
    ratingMax: searchParams.get('ratingMax') ? Number(searchParams.get('ratingMax')) : undefined,
    priceMin: searchParams.get('priceMin') ? Number(searchParams.get('priceMin')) : undefined,
    priceMax: searchParams.get('priceMax') ? Number(searchParams.get('priceMax')) : undefined,
    verified: searchParams.get('verified') === 'true' ? true : searchParams.get('verified') === 'false' ? false : undefined,
    foundedYearMin: searchParams.get('foundedYearMin') ? Number(searchParams.get('foundedYearMin')) : undefined,
    foundedYearMax: searchParams.get('foundedYearMax') ? Number(searchParams.get('foundedYearMax')) : undefined,
    employeeCount: searchParams.get('employeeCount')?.split(',').filter(Boolean) || [],
    sort: searchParams.get('sort') || 'rating_desc',
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 12,
  };
}