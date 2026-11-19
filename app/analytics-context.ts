"use client";

import { createContext } from "react";
import type { Attribution } from "./analytics-attribution";

export const EnquiryAnalytics = createContext<{
  attribution: () => Attribution | undefined;
  completed: (attribution?: Attribution) => void;
} | null>(null);
