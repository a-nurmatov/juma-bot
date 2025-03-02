const IMG_CAPTIONS = [
  '🌸 *Juma Mubarak!* May this Friday bring peace and blessings to you and your loved ones.',
  '🕌 *Juma Mubarak!* Wishing you a day filled with serenity and divine grace.',
  '✨ *Juma Mubarak!* May Allah accept your prayers and grant you happiness.',
];

let captionOrder = 0;

export function generateCaption(senderName?: string): string {
  captionOrder = (captionOrder + 1) % IMG_CAPTIONS.length;
  let caption = IMG_CAPTIONS[captionOrder];
  if (senderName) caption += `\n\n🖋 *${senderName}*`;
  return caption;
}
