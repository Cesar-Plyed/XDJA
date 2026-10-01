import { FC } from 'react';
import {
  Check,
  Building2,
  Hammer,
  Palette,
  Sparkles,
  Star,
  Moon,
  Sun,
  X,
  Menu,
  MessageSquare,
  Link as LinkIcon,
  Scale,
  Shield,
  Cookie,
  Globe,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Loader2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  User,
  LogIn,
  LogOut,
  Settings,
  Plus,
  Trash2,
  Edit,
  ArrowRight,
  Home,
  Store,
  Image,
  Images,
  LayoutDashboard,
  Upload,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react';

export type IconName =
  | 'check'
  | 'building2'
  | 'hammer'
  | 'palette'
  | 'sparkles'
  | 'star'
  | 'moon'
  | 'sun'
  | 'x'
  | 'menu'
  | 'messageSquare'
  | 'link'
  | 'scale'
  | 'shield'
  | 'cookie'
  | 'globe'
  | 'chevronLeft'
  | 'chevronRight'
  | 'mail'
  | 'phone'
  | 'loader2'
  | 'eye'
  | 'eyeOff'
  | 'lock'
  | 'unlock'
  | 'user'
  | 'logIn'
  | 'logOut'
  | 'settings'
  | 'plus'
  | 'trash2'
  | 'edit'
  | 'arrowRight'
  | 'home'
  | 'store'
  | 'image'
  | 'images'
  | 'layoutDashboard'
  | 'upload';

const iconMap: Record<IconName, LucideIcon> = {
  check: Check,
  building2: Building2,
  hammer: Hammer,
  palette: Palette,
  sparkles: Sparkles,
  star: Star,
  moon: Moon,
  sun: Sun,
  x: X,
  menu: Menu,
  messageSquare: MessageSquare,
  link: LinkIcon,
  scale: Scale,
  shield: Shield,
  cookie: Cookie,
  globe: Globe,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  mail: Mail,
  phone: Phone,
  loader2: Loader2,
  eye: Eye,
  eyeOff: EyeOff,
  lock: Lock,
  unlock: Unlock,
  user: User,
  logIn: LogIn,
  logOut: LogOut,
  settings: Settings,
  plus: Plus,
  trash2: Trash2,
  edit: Edit,
  arrowRight: ArrowRight,
  home: Home,
  store: Store,
  image: Image,
  images: Images,
  layoutDashboard: LayoutDashboard,
  upload: Upload,
};

export interface IconProps extends Omit<LucideProps, 'icon'> {
  name: IconName;
  size?: number;
}

export const Icon: FC<IconProps> = ({ name, size = 24, className = '', ...props }) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  // Icons are decorative by default: the surrounding control supplies the
  // accessible name. Pass aria-hidden={false} to opt out.
  return <IconComponent size={size} className={className} aria-hidden="true" {...props} />;
};