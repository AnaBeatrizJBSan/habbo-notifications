interface SelectedBadges {
  badgeIndex: number;
  code: string;
  name: string;
  description: string;
}

interface User {
  uniqueId: string;
  name: string;
  figureString: string;
  motto: string;
  online: boolean;
  lastAccessTime: string;
  memberSince: string;
  profileVisible: boolean;
  currentLevel: number;
  currentLevelCompletePercent: number;
  totalExperience: number;
  starGemCount: number;
  selectedBadges: Array<SelectedBadges>;
}

export { User };
