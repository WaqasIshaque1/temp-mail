# TempMail - Temporary Email Service

A clean, minimalistic temporary email application with a futuristic design. Built with Next.js 16, React 19, and the Barid API.

**Developed by [Waqas Ishaque](https://www.linkedin.com/in/waqas-ishaque)**

## Features

- 📧 **Instant Email Generation**: Generate random temporary email addresses from 12+ supported domains
- 🔄 **Auto-Refresh**: Inbox automatically refreshes every 5 seconds for new emails
- 📬 **Clean Inbox UI**: Modern email list with hover effects and visual indicators
- 📎 **Attachment Support**: View, download, and manage email attachments
- 🎨 **Multiple Theme Presets**: Choose from various theme options with dark mode support
- 🗑️ **Email Management**: Delete individual emails or clear entire inbox
- 📱 **Responsive Design**: Optimized for desktop and mobile devices
- ❓ **Built-in FAQ**: Comprehensive FAQ section for user guidance

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **API**: Barid Temp Mail API

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Generate Email**: Click "Generate" to create a random temporary email address
2. **Copy Email**: Use the copy button to copy the email address to your clipboard
3. **Auto-Refresh**: Inbox automatically checks for new emails every 5 seconds
4. **Manual Refresh**: Click the refresh icon to manually check for new emails
5. **View Email**: Click on any email in the inbox to view its content
6. **View Attachments**: Switch to the Files tab to download or manage attachments
7. **Delete Emails**: Use the trash icon to delete individual emails or clear all
8. **Change Theme**: Use the theme selector in the header to switch between themes

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main page with app logic
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── email-generator.tsx # Email generation component
│   ├── inbox-list.tsx      # Email list component
│   ├── email-viewer.tsx    # Email content viewer
│   ├── attachments-viewer.tsx # Attachments viewer
│   ├── theme-provider.tsx  # Theme context provider
│   └── theme-selector.tsx  # Theme switcher component
├── lib/
│   ├── api.ts             # API service layer
│   ├── theme-presets.ts   # Theme configurations
│   └── utils.ts           # Utility functions
└── types/
    ├── email.ts           # Email type definitions
    └── theme.ts           # Theme type definitions
```

## API Endpoints Used

- `GET /domains` - Get supported email domains
- `GET /emails/{emailAddress}` - Get emails for an address
- `GET /emails/count/{emailAddress}` - Get email count
- `GET /inbox/{emailId}` - Get email details
- `GET /inbox/{emailId}/attachments` - Get email attachments
- `GET /attachments/{attachmentId}` - Download attachment
- `DELETE /inbox/{emailId}` - Delete email
- `DELETE /emails/{emailAddress}` - Delete all emails
- `DELETE /attachments/{attachmentId}` - Delete attachment

## Supported Domains

- barid.site
- vwh.sh
- iusearch.lol
- lifetalk.us
- z44d.pro
- wael.fun
- tawbah.site
- kuruptd.ink
- oxno1.space
- hacktivc.com
- lealaom.xyz
- leala.site

## Building for Production

```bash
npm run build
npm start
```

## Links

- **GitHub**: [https://github.com/WaqasIshaque1/temp-mail](https://github.com/WaqasIshaque1/temp-mail)
- **Developer**: [Waqas Ishaque on LinkedIn](https://www.linkedin.com/in/waqas-ishaque)
- **API**: [Barid Temp Mail API](https://api.barid.site/)

## Credits

- **Developer**: [Waqas Ishaque](https://www.linkedin.com/in/waqas-ishaque)
- **API**: [Barid Temp Mail API](https://api.barid.site/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Framework**: [Next.js](https://nextjs.org/)

## License

MIT
