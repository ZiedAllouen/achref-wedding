"use client";

import { useSearchParams } from "next/navigation";
import styles from "./FoldedCard.module.css";

/**
 * Reads the ?to= query param and prints it below the couple's names. Must
 * be rendered inside a <Suspense> boundary because useSearchParams opts
 * the subtree out of static rendering (see
 * node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-search-params.md).
 */
export function GuestName() {
  const searchParams = useSearchParams();
  const raw = searchParams.get("to");
  if (!raw) return null;

  const name = raw.trim().slice(0, 40);
  if (!name) return null;

  return (
    <p className={`t-guest ${styles.guestName}`} data-testid="guest-name">
      {name}
    </p>
  );
}
