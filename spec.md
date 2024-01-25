# Requirements

- Thumbnails should load quickly - optimise image load techniques
- Gallery should be moveable and update main image.
  - Maybe use gallery container and select child methods
- Accessibility considerations
  - Next and previous buttons to navigate gallery
  - Alt tag content updating.
  - Research aria best practices
- Make use of media queries

# Stretch Goals

- Make the event listener functionality reusable based on click type. Research "event-delegation"
- Investigate screen reader (<div id="announcer" role="status" aria-live="assertive" aria-atomic="true"></div>)

# Universal handler idea - best method?

const eventHandler = (type, function) => {
if (type === "click") {
// take action
} else (type === "keydown"){
// take action
}
// etc
}

maybe there is a catch all event method?
