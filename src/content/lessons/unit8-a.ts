import type { Lesson } from "@/lib/types";
import { U8_COULOMB } from "./u8-coulomb";
import { U8_NEUTRAL } from "./u8-neutral";
import { U8_XFER } from "./u8-xfer";
import { U8_FIELD } from "./u8-field";
import { U8_SUPER } from "./u8-super";

export const UNIT8_LESSONS_A: Lesson[] = [U8_COULOMB, U8_NEUTRAL, U8_XFER, U8_FIELD, U8_SUPER];
