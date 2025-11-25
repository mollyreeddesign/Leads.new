# Image Assets

All image assets from the Figma design have been downloaded and saved locally to ensure they never expire.

## Location

```
src/assets/
├── leads-logo.svg          # Leads.new logo
├── chevron-down.svg        # Dropdown chevron icon
└── icons/                  # All interface icons (33 files)
    ├── robot-1.svg to robot-5.svg           # Chat mode icon parts
    ├── design-1.svg to design-5.svg         # Design mode icon parts
    ├── design-white-1.svg to design-white-5.svg  # White design icon for chat button
    ├── quiz-1.svg to quiz-5.svg             # Quiz mode icon parts
    ├── brand-1.svg to brand-3.svg           # Brand mode icon parts
    ├── code-1.svg and code-2.svg            # Code mode icon parts
    ├── settings-1.svg and settings-2.svg    # Settings icon parts
    ├── edit.svg                              # Edit button icon
    ├── arrow-up-1.svg and arrow-up-2.svg    # Send/submit arrow icon parts
    ├── arrow-right-1.svg and arrow-right-2.svg  # Page navigation arrow parts
    └── mobile-device.svg                     # Mobile device preview icon
```

## Usage

All assets are imported at the top of `EditViewDesktop.tsx` using ES6 imports:

```typescript
import imgLeadsLogo from '../assets/leads-logo.svg';
import imgLucideChevronDown from '../assets/chevron-down.svg';
// ... etc
```

## Benefits

✅ **No expiration** - Assets will never expire (unlike the 7-day Figma CDN links)  
✅ **Faster loading** - Assets are bundled with your app  
✅ **Offline support** - Works without internet connection  
✅ **Version control** - Assets are tracked in git  
✅ **Better performance** - Vite optimizes and compresses them during build  

## File Types

All assets are in SVG format, which means:
- Infinitely scalable without quality loss
- Small file sizes
- Can be styled with CSS if needed
- Perfect for Retina/high-DPI displays

