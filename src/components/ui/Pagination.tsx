"use client";

import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function PaginationButton({
  children,
  active = false,
  disabled = false,
  ariaCurrent,
  onClick,
}: {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  ariaCurrent?: "page";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-current={ariaCurrent}
      className={cn(
        "inline-flex h-11 min-w-[2.75rem] items-center justify-center rounded-full border px-4 text-sm font-semibold tracking-tight transition",
        active
          ? "border-brand-blue bg-brand-blue text-white shadow-[0_18px_34px_-24px_rgba(29,95,168,0.58)]"
          : "border-[rgba(17,32,51,0.1)] bg-white/82 text-neutral-700 hover:border-brand-blue/24 hover:text-brand-blue",
        disabled && "cursor-not-allowed opacity-45 hover:border-[rgba(17,32,51,0.1)] hover:text-neutral-700"
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      className="flex flex-col gap-4 rounded-[1.5rem] border border-[rgba(17,32,51,0.08)] bg-white/72 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
      aria-label="Results pagination"
    >
      <p className="text-sm font-medium text-neutral-600">
        Page <span className="font-semibold text-brand-navy">{currentPage}</span> of{" "}
        <span className="font-semibold text-brand-navy">{totalPages}</span>
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <PaginationButton disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </PaginationButton>

        {pageNumbers.map((pageNumber) => (
          <PaginationButton
            key={pageNumber}
            active={pageNumber === currentPage}
            ariaCurrent={pageNumber === currentPage ? "page" : undefined}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </PaginationButton>
        ))}

        <PaginationButton disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </PaginationButton>
      </div>
    </nav>
  );
}
