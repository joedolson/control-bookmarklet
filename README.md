# Control Status Bookmarklet

A bookmarklet to check control types and verify whether they have names and their types match their expected elements.

## What does this do?

Currently, this checks all `a`, `button`, `div[role="button"]`, and `input[type="submit|button"]` elements on the current page. It adds a `popover` of the `hint` type, triggered on focus/blur and mouseover/mouseout. The popover contains the control's element, role, inner text, aria-label, aria-labelledby, aria-describedby, and tabindex. Unset values are omitted.

[![License](https://img.shields.io/badge/license-GPL--2.0%2B-green.svg)](https://www.gnu.org/license/gpl-2.0.html)

Donate link: https://www.joedolson.com/donate/

## Bookmarklet

Add the bookmarklet below to your bookmarks bar. [Omitted while still in development.]

```javascript
---
```

## Contribute

Bugs or feature development contributions should be made through the [GitHub repository](https://github.com/joedolson/control-bookmarklet/issues)

## Authors

* [Joe Dolson](https://www.joedolson.com)
