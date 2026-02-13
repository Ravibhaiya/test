// src/lib/types.ts

export type Page =
  | 'home'
  | 'table-selection'
  | 'practice-config'
  | 'powers-config'
  | 'fractions-config'
  | 'alphabet-config'
  | 'execution';

export type Mode = '' | 'tables' | 'practice' | 'powers' | 'fractions' | 'alphabet';

export type NonNullableMode = 'tables' | 'practice' | 'powers' | 'fractions' | 'alphabet';

export type PowerType = 'squares' | 'cubes' | 'square_roots' | 'cube_roots';

export type FractionAnswerType = 'fraction' | 'decimal';

export type AlphabetMode = 'letter_to_position' | 'position_to_letter' | 'reverse_letter';

export interface PracticeConfig {
  tables: {
    selected: number[];
    timer?: number;
  };
  practice: {
    digits1: number[];
    digits2: number[];
    timer?: number;
  };
  powers: {
    selected: PowerType[];
    rangeMax: number;
    timer?: number;
  };
  fractions: {
    selected: FractionAnswerType[];
    timer?: number;
  };
  alphabet: {
    start: string;
    end: string;
    mode?: AlphabetMode;
    timer?: number;
  };
}

export type ExecutionConfig =
  | PracticeConfig['tables']
  | PracticeConfig['practice']
  | PracticeConfig['powers']
  | PracticeConfig['fractions']
  | PracticeConfig['alphabet'];
