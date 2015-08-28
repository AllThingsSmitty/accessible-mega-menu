# Accessible Mega Menu

This demonstrates how to implement a keyboard- and screen reader- accessible mega menu as a jQuery plugin. Content for the links and text within the mega menu comes from the [Web Content Accessibility Guidelines (WCAG) 2.0](http://www.w3.org/TR/WCAG/).


## Keyboard Accessibility

The accessible mega menu supports keyboard interaction modeled after the behavior described in the [WAI-ARIA Menu or Menu bar (widget) design pattern](http://www.w3.org/TR/wai-aria-practices/#menu), however it also respects users' general expectations for the behavior of links in a global navigation. The accessible mega menu implementation permits tab focus on each of the six top-level menu items.

* When one of the menu items has focus, pressing the `Enter` key, `Spacebar` or `Down` arrow will open the submenu panel, and pressing the `Left` or `Right` arrow key will shift focus to the adjacent menu item.
* Links within the submenu panels are included in the tab order when the panel is open. Links can also be navigated with the arrow keys or by typing the first character in the link name, which speeds up keyboard navigation considerably.
* Pressing the `Escape` key closes the submenu and restores focus to the parent menu item.


## Screen Reader Accessibility

The accessible mega menu models its use of WAI-ARIA roles, states, and properties after those described in the [WAI-ARIA Menu or Menu bar (widget) design pattern](http://www.w3.org/TR/wai-aria-practices/#menu) with some notable exceptions, so that it behaves better with screen reader user expectations for global navigation. The accessible mega menu doesn't use `role="menu"` for the menu container and `role="menuitem"` for each of the links therein; if it did, assistive technology will no longer interpret the links as _links_, but instead as _menu items_, and the links in the global navigation will no longer show up when a screen reader user executes a shortcut command to bring up a list of links in the page.

This approach maintains the semantic structure of the submenu panels in the accessible mega menu by omitting `role="menu"` and `role="menuitem"` for the global navigation; the links are organized into lists and separated by headings.


## Usage

### HTML

The HTML for the accessible mega menu is a `nav` element &#8212; or any other container element &#8212; containing a list. Each list item contains a link which is followed by a `div` or any other container element which will serve as the pop up panel.

The panel can contain any HTML content; in the following example, each panel contains three lists of links. You can explicitly define groups within the panel, between which a user can navigate quickly using the left and right arrow keys; in the following example, the CSS class `.sub-nav-group` identifies a navigable group.

```html
<nav>
  <ul class="nav-menu">
    <li class="nav-item">
      <a href="?movie">Music</a>
      <div class="sub-nav">
        <ul class="sub-nav-group">
          <li><a href="?music&amp;genre=0">Alternative</a></li>
          <li><a href="?music&amp;genre=3">Country</a></li>
          <li>&#8230;</li>
        </ul>
        <ul class="sub-nav-group">
          <li><a href="?music&amp;genre=1">Dance</a></li>
          <li><a href="?music&amp;genre=4">Electronic</a></li>
          <li>&#8230;</li>
        </ul>
        <ul class="sub-nav-group">
          <li><a href="?music&amp;genre=2">Hip-Hop/Rap</a></li>
          <li><a href="?music&amp;genre=5">Jazz</a></li>
          <li>&#8230;</li>
        </ul>
      </div>
    </li>
    <li class="nav-item">
      <a href="?tv">Movies</a>
      <div class="sub-nav">
        <ul class="sub-nav-group">
          <li><a href="?movies&amp;genre=10">New Release</a></li>
          <li><a href="?movies&amp;genre=13">Comedy</a></li>
          <li>&#8230;</li>
        </ul>
        <ul class="sub-nav-group">
          <li><a href="?movies&amp;genre=11">Drama</a></li>
          <li><a href="?movies&amp;genre=14">Sci-Fi</a></li>
          <li>&#8230;</li>
        </ul>
        <ul class="sub-nav-group">
          <li><a href="?movies&amp;genre=12">Horror</a></li>
          <li><a href="?movies&amp;genre=15">Documentary</a></li>
          <li>&#8230;</li>
        </ul>
      </div>
    </li>
  </ul>
</nav>
```

By default, the accessible mega menu uses the the following CSS classes to define the top-level navigation items, panels, groups within the panels, and the hover, focus, and open states. It also defines a prefix for unique ID strings, which are required to indicate the relationship of a top-level navigation item to the panel it controls.

```javascript
defaults = {
  // unique ID's are required to indicate aria-owns, aria-controls and aria-labelledby
  uuidPrefix: "menu",

  // default CSS class used to define the megamenu styling
  menuClass: "menu",

  // default CSS class for a top-level navigation item in the megamenu
  topNavItemClass: "menu-top-nav-item",

  // default CSS class for a megamenu panel */
  panelClass: "menu-panel",

  // default CSS class for a group of items within a megamenu panel
  panelGroupClass: "menu-panel-group",

  // default CSS class for the hover state
  hoverClass: "hover",

  // default CSS class for the focus state
  focusClass: "focus",

  // default CSS class for the open state
  openClass: "open" 
}
```

You can optionally override the defaults to use the CSS classes you may have already defined for your mega menu.

### JavaScript

Be sure to include jQuery and the accessible-mega-menu.js plugin script. jQuery 1.10.0 is the highest version that will continue to support IE8.

```html
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
  <script src="js/accessible-mega-menu.js"></script>
```

The following initializes the first nav element in the document as an accessibleMegaMenu, with optional CSS class overrides.

```javascript
$("nav:first").accessibleMegaMenu({
  // prefix for generated unique id attributes, which are required
  // to indicate aria-owns, aria-controls and aria-labelledby
  uuidPrefix: "menu",

  // CSS class used to define the megamenu styling
  menuClass: "nav-menu",

  // CSS class for a top-level navigation item in the megamenu
  topNavItemClass: "nav-item",

  // CSS class for a megamenu panel
  panelClass: "sub-nav",

  // CSS class for a group of items within a megamenu panel
  panelGroupClass: "sub-nav-group",

  // CSS class for the hover state
  hoverClass: "hover",

  // CSS class for the focus state
  focusClass: "focus",

  // CSS class for the open state
  openClass: "open"
});
```
### CSS

AccessibleMegaMenu handles the showing and hiding of panels by adding or removing a CSS class. No inline styles are added to hide elements or create animation between states.

This CSS example enables the showing/hiding of and the layout of lists panels in the mega menu.

```css
/* mega menu list */
.nav-menu {
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
  z-index: 15;
}

/* a top level navigation item in the mega menu */
.nav-item {
  display: inline-block;
  list-style: none;
  margin: 0;
  padding: 0;
}

/* first descendant link within a top level navigation item */
.nav-item > a {
  border: 1px solid transparent;
  display: inline-block;
  margin: 0 0 -1px 0;
  padding: 0.5em 1em;
  position: relative;
}

/* focus/open states of first descendant link within a top level navigation item */
.nav-item > a:focus,
.nav-item > a.open {
  border: 1px solid #dedede;
}

/* open state of first descendant link within a top level 
   navigation item */
.nav-item > a.open {
  background-color: #fff;
  border-bottom: none;
  z-index: 1;
}

/* sub-navigation panel */
.sub-nav {
  background-color: #fff;
  border: 1px solid #dedede;
  display: none;
  margin-top: -1px;
  padding: 0.5em 1em;
  position: absolute;
  top: 2.2em;
}

/* sub-navigation panel open state */
.sub-nav.open {
  display: block;
}

/* list of items within sub-navigation panel */
.sub-nav ul {
  display: inline-block;
  margin: 0 1em 0 0;
  padding: 0;
  vertical-align: top;
}

/* list item within sub-navigation panel */
.sub-nav li {
  display: block;
  line-height: 1.5;
  list-style-type: none;
  margin: 0;
  padding: 0;
}   
```

Putting it all together, here is the completed example:

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Simple Accessible Mega Menu Example</title>
<style>
  /* Rudimentary mega menu CSS for demonstration */    

  /* mega menu list */
  .nav-menu {
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
    position: relative;
    z-index: 15;
  }

  /* a top level navigation item in the mega menu */
  .nav-item {
    display: inline-block;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /* first descendant link within a top level navigation item */
  .nav-item > a {
    border: 1px solid transparent;
    display: inline-block;
    margin: 0 0 -1px 0;
    padding: 0.5em 1em;
    position: relative;
  }

  /* focus/open states of first descendant link within a top level navigation item */
  .nav-item > a:focus,
  .nav-item > a.open {
    border: 1px solid #dedede;
  }

  /* open state of first descendant link within a top level 
     navigation item */
  .nav-item > a.open {
    background-color: #fff;
    border-bottom: none;
    z-index: 1;
  }

  /* sub-navigation panel */
  .sub-nav {
    background-color: #fff;
    border: 1px solid #dedede;
    display: none;
    margin-top: -1px;
    padding: 0.5em 1em;
    position: absolute;
    top: 2.2em;
  }

  /* sub-navigation panel open state */
  .sub-nav.open {
    display: block;
  }

  /* list of items within sub-navigation panel */
  .sub-nav ul {
    display: inline-block;
    margin: 0 1em 0 0;
    padding: 0;
    vertical-align: top;
  }

  /* list item within sub-navigation panel */
  .sub-nav li {
    display: block;
    line-height: 2;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }     
</style>
</head>
<body>
  <nav class="megamenu">
    <ul class="nav-menu">
      <li class="nav-item">
        <a href="?movie">Music</a>
        <div class="sub-nav">
           <ul class="sub-nav-group">
            <li><a href="?music&amp;genre=0">Alternative</a></li>
            <li><a href="?music&amp;genre=3">R&amp;B/Soul</a></li>
            <li><a href="?music&amp;genre=6">Indie</a></li>
          </ul>
          <ul class="sub-nav-group">
            <li><a href="?music&amp;genre=1">Dance</a></li>
            <li><a href="?music&amp;genre=4">Electronic</a></li>
            <li><a href="?music&amp;genre=7">Metal</a></li>
          </ul>
          <ul class="sub-nav-group">
            <li><a href="?music&amp;genre=2">Hip-Hop/Rap</a></li>
            <li><a href="?music&amp;genre=5">Jazz</a></li>
            <li><a href="?music&amp;genre=8">Latino</a></li>
          </ul>
        </div>
      </li>
      <li class="nav-item">
        <a href="?tv">Movies</a>
        <div class="sub-nav">
          <ul class="sub-nav-group">
            <li><a href="?movies&amp;genre=10">New Release</a></li>
            <li><a href="?movies&amp;genre=13">Comedy</a></li>
            <li><a href="?movies&amp;genre=16">Action</a></li>
          </ul>
          <ul class="sub-nav-group">
            <li><a href="?movies&amp;genre=11">Drama</a></li>
            <li><a href="?movies&amp;genre=14">Sci-Fi</a></li>
            <li><a href="?movies&amp;genre=17">Adventure</a></li>
          </ul>
          <ul class="sub-nav-group">
            <li><a href="?movies&amp;genre=12">Horror</a></li>
            <li><a href="?movies&amp;genre=15">Documentary</a></li>
            <li><a href="?movies&amp;genre=18">Fantasy</a></li>
          </ul>
        </div>
      </li>
    </ul>
  </nav>

  <!-- include jQuery -->
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/jquery-1.10.1.min.js">\x3C/script>')</script>

  <!-- include the accessible-mega-menu plugin script -->
  <script src="js/accessible-mega-menu.js"></script>

  <!-- initialize a selector as an accessible-mega-menu -->
  <script>
  $("nav:first").accessibleMegaMenu({
    // prefix for generated unique id attributes, which are required
    // to indicate aria-owns, aria-controls and aria-labelledby
    uuidPrefix: "menu",

    // CSS class used to define the megamenu styling
    menuClass: "nav-menu",

    // CSS class for a top-level navigation item in the megamenu
    topNavItemClass: "nav-item",

    // CSS class for a megamenu panel
    panelClass: "sub-nav",

    // CSS class for a group of items within a megamenu panel
    panelGroupClass: "sub-nav-group",

    // CSS class for the hover state
    hoverClass: "hover",

    // CSS class for the focus state
    focusClass: "focus",

    // CSS class for the open state
    openClass: "open"
  });
  </script>
</body>
</html>
```

## Support

The accessible mega menu works in current versions of Chrome, Firefox, Opera, Safari, Edge, and Internet Explorer 11.


## License

[The MIT License (MIT)](http://allthingssmitty.mit-license.org/)
