const emotes = { corpa: { src: 'https://cdn.7tv.app/emote/612a803421ca87d781a04fd2/4x', alt: 'corpa' } }
export function getEmote(emote: keyof typeof emotes): { src: string; alt: string } {
  return emotes[emote]
}
