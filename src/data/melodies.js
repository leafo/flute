// Melodies encoded as [degree, octave, duration in beats]
// Degrees: 1-7 for diatonic scale, negative for rests
export const melodies = [
    {
        name: "Amazing Grace",
        tempo: 72,
        notes: [
            // Amazing grace, how sweet the sound
            [5, 1, 1], [1, 2, 2], [3, 2, 0.5], [1, 2, 0.5], [3, 2, 2], [2, 2, 1],
            [1, 2, 2], [6, 1, 1], [5, 1, 2], [-1, 1, 1],
            // That saved a wretch like me
            [5, 1, 1], [1, 2, 2], [3, 2, 0.5], [1, 2, 0.5], [3, 2, 2], [2, 2, 1],
            [5, 2, 3], [-1, 1, 1],
            // I once was lost but now am found
            [5, 2, 1], [3, 2, 2], [5, 2, 0.5], [3, 2, 0.5], [5, 2, 2], [3, 2, 1],
            [1, 2, 2], [6, 1, 1], [5, 1, 2], [-1, 1, 1],
            // Was blind but now I see
            [5, 1, 1], [1, 2, 2], [3, 2, 0.5], [1, 2, 0.5], [3, 2, 2], [2, 2, 1],
            [1, 2, 3]
        ]
    },
    {
        name: "Oh! Susanna",
        tempo: 120,
        notes: [
            // I come from Alabama with my banjo on my knee
            [1, 2, 0.5], [2, 2, 0.5], [3, 2, 1], [5, 2, 1], [5, 2, 0.5], [6, 2, 0.5], [5, 2, 1], [3, 2, 1],
            [1, 2, 0.5], [2, 2, 0.5], [3, 2, 1], [3, 2, 1], [2, 2, 1], [1, 2, 1], [2, 2, 2],
            // I'm going to Louisiana my true love for to see
            [1, 2, 0.5], [2, 2, 0.5], [3, 2, 1], [5, 2, 1], [5, 2, 0.5], [6, 2, 0.5], [5, 2, 1], [3, 2, 1],
            [1, 2, 0.5], [2, 2, 0.5], [3, 2, 1], [3, 2, 1], [2, 2, 1], [2, 2, 1], [1, 2, 2],
            // Oh Susanna, don't you cry for me
            [4, 2, 1], [4, 2, 1], [6, 2, 2], [6, 2, 1], [5, 2, 1], [3, 2, 2],
            [1, 2, 0.5], [2, 2, 0.5], [3, 2, 1], [3, 2, 1], [2, 2, 1], [1, 2, 1], [2, 2, 2],
            // For I come from Alabama with my banjo on my knee
            [4, 2, 1], [4, 2, 1], [6, 2, 2], [6, 2, 1], [5, 2, 1], [3, 2, 1], [3, 2, 1],
            [1, 2, 0.5], [2, 2, 0.5], [3, 2, 1], [3, 2, 1], [2, 2, 1], [2, 2, 1], [1, 2, 2]
        ]
    },
    {
        name: "Home on the Range",
        tempo: 90,
        notes: [
            // Oh give me a home where the buffalo roam
            [1, 2, 1], [1, 2, 2], [3, 2, 1], [5, 2, 2], [5, 2, 1],
            [6, 2, 2], [5, 2, 1], [3, 2, 2], [1, 2, 1],
            // Where the deer and the antelope play
            [2, 2, 2], [2, 2, 1], [4, 2, 2], [3, 2, 1],
            [2, 2, 2], [1, 2, 1], [7, 1, 3],
            // Where seldom is heard a discouraging word
            [7, 1, 1], [1, 2, 2], [3, 2, 1], [5, 2, 2], [5, 2, 1],
            [6, 2, 2], [5, 2, 1], [3, 2, 3],
            // And the skies are not cloudy all day
            [5, 2, 2], [3, 2, 1], [2, 2, 2], [1, 2, 1],
            [2, 2, 2], [3, 2, 1], [1, 2, 3]
        ]
    },
    {
        name: "Simple Gifts",
        tempo: 100,
        notes: [
            // 'Tis the gift to be simple, 'tis the gift to be free
            [5, 1, 1], [1, 2, 1], [1, 2, 1], [1, 2, 1], [2, 2, 1], [3, 2, 1], [3, 2, 1], [3, 2, 1],
            [2, 2, 1], [3, 2, 1], [4, 2, 1], [5, 2, 1], [5, 2, 2],
            // 'Tis the gift to come down where we ought to be
            [5, 2, 1], [5, 2, 1], [6, 2, 1], [5, 2, 1], [3, 2, 1], [2, 2, 1], [1, 2, 2],
            [2, 2, 1], [3, 2, 1], [2, 2, 1], [1, 2, 1], [6, 1, 1], [5, 1, 1], [5, 1, 2],
            // And when we find ourselves in the place just right
            [5, 1, 1], [1, 2, 1], [1, 2, 1], [1, 2, 1], [2, 2, 1], [3, 2, 1], [3, 2, 1], [3, 2, 1],
            [2, 2, 1], [3, 2, 1], [4, 2, 1], [5, 2, 1], [5, 2, 2],
            // 'Twill be in the valley of love and delight
            [5, 2, 1], [5, 2, 1], [6, 2, 1], [5, 2, 1], [3, 2, 1], [2, 2, 1], [1, 2, 2],
            [2, 2, 1], [3, 2, 1], [2, 2, 1], [1, 2, 1], [1, 2, 3]
        ]
    },
    {
        name: "Twinkle Twinkle",
        tempo: 100,
        notes: [
            // Twinkle twinkle little star
            [1, 2, 1], [1, 2, 1], [5, 2, 1], [5, 2, 1], [6, 2, 1], [6, 2, 1], [5, 2, 2],
            // How I wonder what you are
            [4, 2, 1], [4, 2, 1], [3, 2, 1], [3, 2, 1], [2, 2, 1], [2, 2, 1], [1, 2, 2],
            // Up above the world so high
            [5, 2, 1], [5, 2, 1], [4, 2, 1], [4, 2, 1], [3, 2, 1], [3, 2, 1], [2, 2, 2],
            // Like a diamond in the sky
            [5, 2, 1], [5, 2, 1], [4, 2, 1], [4, 2, 1], [3, 2, 1], [3, 2, 1], [2, 2, 2],
            // Twinkle twinkle little star
            [1, 2, 1], [1, 2, 1], [5, 2, 1], [5, 2, 1], [6, 2, 1], [6, 2, 1], [5, 2, 2],
            // How I wonder what you are
            [4, 2, 1], [4, 2, 1], [3, 2, 1], [3, 2, 1], [2, 2, 1], [2, 2, 1], [1, 2, 2]
        ]
    }
];
