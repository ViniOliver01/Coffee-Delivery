interface ImageTypes {
  type: "Coffee";
}

export function imgDefault({ type }: ImageTypes) {
  if (type === "Coffee") {
    return "https://imgur.com/FM5c0U1.png";
  }
}
