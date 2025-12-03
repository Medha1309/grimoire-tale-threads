# Terminal Quick Start

## What is it?

A command-line interface embedded in your Dollhouse that lets you navigate and control the app using text commands - like a tiny operating system inside a haunted house.

## Where is it?

At the top of the Dollhouse home page, you'll see a vintage CRT terminal with green text. It boots up when you enter the Dollhouse.

## How to use it?

Just click in the terminal and start typing commands!

### Try these first:

```bash
help                    # See all commands
open room diary         # Open your diary
write "hello" -> diary  # Create a diary entry
back                    # Return home
```

### Navigation shortcuts:

```bash
open room scrapbook     # View scrapbook
open room art           # Open art studio
open room bookmarks     # See saved books
home                    # Return to home
```

### Tips:

- **Arrow Up/Down**: Cycle through previous commands
- **Case doesn't matter**: `HELP` = `help` = `HeLp`
- **Use quotes for text**: `write "my secret" -> diary`
- **Tab to focus**: Click or tab into the terminal

## Why use it?

- **Faster**: Navigate without clicking through menus
- **Powerful**: Chain multiple operations
- **Cool**: Feels like hacking into your own haunted house
- **Optional**: Traditional UI still works - use what you prefer!

## Common Commands

| Command | What it does |
|---------|-------------|
| `help` | Show all commands |
| `open room diary` | Open diary room |
| `write "text" -> diary` | Create diary entry |
| `new diary` | Start new diary entry |
| `list diary` | List all diary entries |
| `search [query]` | Search your content |
| `stats` | Show statistics |
| `clear` | Clear terminal |
| `back` | Go back |
| `home` | Return home |

## Examples

### Create a diary entry:
```bash
> write "Today was strange" -> diary
✓ Creating new diary entry...
✓ Opening editor...
```

### Navigate to scrapbook:
```bash
> open room scrapbook
✓ Opening scrapbook room...
```

### Get help:
```bash
> help
Available commands:
...
```

## Coming Soon

- Link entries together
- Export to PDF
- Version history
- Batch operations
- Easter eggs!

---

**Pro tip**: The terminal and traditional UI work together. Use whichever feels right in the moment!
