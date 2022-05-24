import { SupabaseClient } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import supabase from "./supabase"

/**
 * @param {(supabase: SupabaseClient) => void} defaultQuery 
 * @returns {[{isLoading: Boolean, result: any}, (query: (supabase: SupabaseClient) => void) => void]}
 */
export default (defaultQuery, resultHandler = result => result.data) => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [query, setQuery] = useState(() => defaultQuery);
  const [currentResultHandler, setResultHandler] = useState(() => resultHandler);

  useEffect(() => {
    (async () => {
      if (!query) {
        return;
      }

      setIsLoading(true);
      const result = await query(supabase);
      
      if (result.error) {
        throw result.error;
      }

      setResult(currentResultHandler(result));
      setIsLoading(false);
    })();
  }, [query, currentResultHandler])

  return [
    {
      isLoading,
      result
    },
    (newQuery, handler = result => result.data) => {
      setQuery(() => newQuery)
      setResultHandler(() => handler)
    }
  ]
}