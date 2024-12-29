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

interface Group {
  online: boolean;
  id: string;
  name: string;
  description: string;
  type: string;
  roomId: string;
  badgeCode: string;
  primaryColour: string;
  secondaryColour: string;
  isAdmin: boolean;
}

interface Badge {
  code: string;
  name: string;
  description: string;
}

interface Friend {
  name: string;
  motto: string;
  online: boolean;
  uniqueId: string;
  figureString: string;
}

interface Room {
  id: number;
  name: string;
  description: string;
  creationTime: string;
  tags: Array<string>;
  maximumVisitors: number;
  showOwnerName: boolean;
  ownerName: string;
  ownerUniqueId: string;
  categories: Array<string>;
  thumbnailUrl: string;
  imageUrl: string;
  rating: number;
  uniqueId: string;
}

interface UserDetailed {
  user: User;
  groups: Array<Group>;
  badges: Array<Badge>;
  friends: Array<Friend>;
  rooms: Array<Room>;
}

export { User, UserDetailed };
