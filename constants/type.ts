// Format des différentes tailles d'images
export interface ImageFormats {
  large?: { url: string };
  medium?: { url: string };
  small?: { url: string };
  thumbnail?: { url: string };
}

// Détails des attributs d'une image
export interface ImageDataAttributes {
  name: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: ImageFormats;
  url: string;
  previewUrl?: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

// Objet image
export interface ImageData {
  id: number;
  attributes: ImageDataAttributes;
}

// Attributs d'un fichier (document, vidéo, etc.)
export interface FileAttributes {
  name: string;
  alternativeText?: string;
  caption?: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}

// Objet fichier
export interface FileData {
  id: number;
  attributes: FileAttributes;
}

// Type de contenu textuel
export interface ContentText {
  type: "text";
  text: string;
  bold?: boolean;
}

// Type de paragraphe
export interface ContentParagraph {
  type: "paragraph";
  children: ContentText[];
}

// Type de titre (heading)
export interface ContentHeading {
  type: "heading";
  children: ContentText[];
  level: number;
}

// Type de code (block de code)
export interface ContentCode {
  type: "code";
  children: ContentText[];
}

// Type d'image dans le contenu
export interface ContentImage {
  type: "image";
  image: ImageDataAttributes;
  children: ContentText[];
}

// Union des différents types de contenu possibles
export type Content =
  | ContentParagraph
  | ContentHeading
  | ContentCode
  | ContentImage;

// Attributs d'une ressource
export interface ResourceAttributes {
  title: string;
  createdAt: string;
  description: string;
  youtube_video?: string;
  contents?: Content[];
  image?: {
    data?: ImageData;
  };
  files?: {
    data?: FileData[];
  };
  video?: {
    data?: FileData | null;
  };
}

// Objet ressource
export interface Resource {
  id: number;
  attributes: ResourceAttributes;
}

// Réponse API pour les ressources
export interface ApiResponse {
  data: Resource[];
  meta?: {
    pagination: {
      pageCount: number;
    };
  };
}

// Attributs des likes
export interface LikeAttributes {
  resource: {
    data: {
      id: number;
    };
  };
  clerk_user: string;
}

// Objet like
export interface Like {
  id: number;
  attributes: LikeAttributes;
}

// Réponse API pour les likes
export interface LikeResponse {
  data: Like[];
}

// Props pour les composants des ressources
export interface ResourcesProps {
  setOpenResources: React.Dispatch<React.SetStateAction<boolean>>;
  resourceId?: number | null;
}

// Props pour les détails des ressources
export interface ResourceDetailsProps {
  resourceData: {
    attributes: ResourceAttributes;
  } | null;
}
