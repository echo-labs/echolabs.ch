export function mapToJson(map: Map<string, string>): Record<string, string> {
  return Object.fromEntries(map);
}

export function secretSantaPairings(participants: string[]): Map<string, string> {
  console.warn(participants);
  if (participants.length < 2) {
    throw new Error('At least two participants are required');
  }

  const shuffled = [...participants];
  const pairings = new Map<string, string>();

  // Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  for (let i = 0; i < participants.length; i++) {
    const giver = participants[i];
    const recipientIndex = (i + 1) % participants.length;
    const recipient = shuffled[recipientIndex];

    // Ensure no one gives to themselves
    if (giver === recipient) {
      // Swap with next participant if it would be a self-gift
      const swapIndex = (recipientIndex + 1) % participants.length;
      [shuffled[recipientIndex], shuffled[swapIndex]] = [
        shuffled[swapIndex],
        shuffled[recipientIndex],
      ];
    }

    pairings.set(giver, shuffled[recipientIndex]);
  }

  console.warn('pairing');
  console.warn(pairings);
  return pairings;
}

// Decode names from URL-safe Base64
export function decodeJson(encoded: string): any {
  try {
    // Restore Base64 padding
    const base64 = encoded
      .replace(/-/g, '+') // Replace - with +
      .replace(/_/g, '/'); // Replace _ with /

    // Add padding if needed
    const paddedBase64 = base64 + '=='.slice(0, (4 - (base64.length % 4)) % 4);

    // Decode from Base64 and parse JSON
    const jsonString = atob(paddedBase64);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Decoding error:', error);
    return undefined;
  }
}

export function encodeJson(data: any): string {
  try {
    console.warn('Encoding data');
    console.warn(data);
    // Convert names array to JSON string
    const jsonString = JSON.stringify(data);

    console.warn('jsonString');
    console.warn(jsonString);

    // Encode to Base64 and make it URL-safe
    const base64 = btoa(jsonString)
      .replace(/\+/g, '-') // Replace + with -
      .replace(/\//g, '_') // Replace / with _
      .replace(/=+$/, ''); // Remove trailing =

    console.warn(base64);
    return base64;
  } catch (error) {
    console.error('Encoding error:', error);
    return '';
  }
}
