// Melodies encoded as [degree, octave, duration in beats]
// Degrees: 1-7 for diatonic scale, negative for rests
export const melodies = [
    // Traditional American
    {
        name: "Amazing Grace",
        category: "Traditional American",
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
        category: "Traditional American",
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
        category: "Traditional American",
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
        category: "Traditional American",
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
        category: "Traditional American",
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
    },
    {
        name: "Shenandoah",
        category: "Traditional American",
        tempo: 66,
        notes: [
            // Oh Shenandoah, I long to see you
            [5, 1, 1], [1, 2, 2], [1, 2, 1], [2, 2, 1], [3, 2, 2],
            [3, 2, 1], [2, 2, 1], [1, 2, 2], [7, 1, 1], [1, 2, 3],
            // Away, you rolling river
            [5, 2, 2], [3, 2, 1], [3, 2, 1], [2, 2, 1], [1, 2, 2], [1, 2, 3],
            // Oh Shenandoah, I long to see you
            [5, 1, 1], [1, 2, 2], [1, 2, 1], [2, 2, 1], [3, 2, 2],
            [3, 2, 1], [2, 2, 1], [1, 2, 2], [7, 1, 1], [1, 2, 3],
            // Away, I'm bound away
            [6, 2, 2], [5, 2, 1], [5, 2, 1], [6, 2, 1], [5, 2, 1], [3, 2, 2],
            // 'Cross the wide Missouri
            [3, 2, 1], [2, 2, 1], [1, 2, 2], [2, 2, 1], [1, 2, 4]
        ]
    },

    // Christmas
    {
        name: "Jingle Bells",
        category: "Christmas",
        tempo: 120,
        notes: [
            // Jingle bells, jingle bells, jingle all the way
            [3, 2, 1], [3, 2, 1], [3, 2, 2],
            [3, 2, 1], [3, 2, 1], [3, 2, 2],
            [3, 2, 1], [5, 2, 1], [1, 2, 1.5], [2, 2, 0.5], [3, 2, 2], [-1, 1, 1],
            // Oh what fun it is to ride in a one-horse open sleigh
            [4, 2, 1], [4, 2, 1], [4, 2, 1.5], [4, 2, 0.5],
            [4, 2, 1], [3, 2, 1], [3, 2, 1], [3, 2, 0.5], [3, 2, 0.5],
            [3, 2, 1], [2, 2, 1], [2, 2, 1], [3, 2, 1], [2, 2, 2], [5, 2, 2],
            // Jingle bells, jingle bells, jingle all the way
            [3, 2, 1], [3, 2, 1], [3, 2, 2],
            [3, 2, 1], [3, 2, 1], [3, 2, 2],
            [3, 2, 1], [5, 2, 1], [1, 2, 1.5], [2, 2, 0.5], [3, 2, 2], [-1, 1, 1],
            // Oh what fun it is to ride in a one-horse open sleigh
            [4, 2, 1], [4, 2, 1], [4, 2, 1.5], [4, 2, 0.5],
            [4, 2, 1], [3, 2, 1], [3, 2, 1], [3, 2, 0.5], [3, 2, 0.5],
            [5, 2, 1], [5, 2, 1], [4, 2, 1], [2, 2, 1], [1, 2, 3]
        ]
    },
    {
        name: "Silent Night",
        category: "Christmas",
        tempo: 80,
        notes: [
            // Silent night, holy night
            [5, 2, 1.5], [6, 2, 0.5], [5, 2, 1], [3, 2, 3],
            [5, 2, 1.5], [6, 2, 0.5], [5, 2, 1], [3, 2, 3],
            // All is calm, all is bright
            [7, 2, 2], [7, 2, 1], [5, 2, 3],
            [6, 2, 2], [6, 2, 1], [3, 2, 3],
            // Round yon virgin mother and child
            [4, 2, 2], [4, 2, 1], [6, 2, 1.5], [5, 2, 0.5], [4, 2, 1],
            [3, 2, 1.5], [4, 2, 0.5], [3, 2, 1], [1, 2, 3],
            // Holy infant so tender and mild
            [4, 2, 2], [4, 2, 1], [6, 2, 1.5], [5, 2, 0.5], [4, 2, 1],
            [3, 2, 1.5], [4, 2, 0.5], [3, 2, 1], [1, 2, 3],
            // Sleep in heavenly peace
            [7, 2, 2], [7, 2, 1], [2, 3, 1.5], [7, 2, 0.5], [5, 2, 1],
            [6, 2, 3], [1, 3, 3],
            // Sleep in heavenly peace
            [5, 2, 1.5], [3, 2, 0.5], [1, 2, 1], [2, 2, 1.5], [7, 1, 0.5], [6, 1, 1],
            [1, 2, 6]
        ]
    },
    {
        name: "We Wish You a Merry Christmas",
        category: "Christmas",
        tempo: 140,
        notes: [
            // We wish you a merry Christmas
            [5, 2, 1], [1, 3, 1], [1, 3, 0.5], [2, 3, 0.5], [1, 3, 0.5], [7, 2, 0.5], [5, 2, 1], [5, 2, 1],
            // We wish you a merry Christmas
            [5, 2, 1], [2, 3, 1], [2, 3, 0.5], [3, 3, 0.5], [2, 3, 0.5], [1, 3, 0.5], [6, 2, 1], [5, 2, 1],
            // We wish you a merry Christmas
            [5, 2, 1], [3, 3, 1], [3, 3, 0.5], [2, 3, 0.5], [1, 3, 0.5], [2, 3, 0.5], [7, 2, 1], [4, 2, 1],
            // And a happy new year
            [1, 3, 1], [6, 2, 1], [6, 2, 1], [5, 2, 1], [1, 3, 2]
        ]
    },
    {
        name: "Joy to the World",
        category: "Christmas",
        tempo: 100,
        notes: [
            // Joy to the world, the Lord is come
            [1, 3, 2], [7, 2, 1.5], [6, 2, 0.5], [5, 2, 3], [4, 2, 1],
            [3, 2, 2], [2, 2, 2], [1, 2, 3], [5, 2, 1],
            // Let earth receive her King
            [6, 2, 2], [6, 2, 1], [5, 2, 3], [5, 2, 1],
            [7, 2, 2], [7, 2, 1], [1, 3, 3], [-1, 1, 1],
            // Let every heart prepare him room
            [1, 3, 1], [1, 3, 1], [7, 2, 0.5], [6, 2, 0.5], [6, 2, 1], [5, 2, 1],
            [5, 2, 1], [5, 2, 1], [4, 2, 0.5], [3, 2, 0.5], [3, 2, 1], [2, 2, 1],
            // And heaven and nature sing
            [1, 3, 2], [5, 2, 1], [6, 2, 1.5], [5, 2, 0.5], [4, 2, 0.5], [3, 2, 0.5], [1, 3, 2],
            [5, 2, 1], [6, 2, 1.5], [5, 2, 0.5], [4, 2, 0.5], [3, 2, 0.5],
            // And heaven, and heaven, and nature sing
            [3, 2, 1], [3, 2, 1], [3, 2, 0.5], [4, 2, 0.5], [5, 2, 2],
            [4, 2, 0.5], [3, 2, 0.5], [2, 2, 1], [1, 3, 1], [7, 2, 1], [6, 2, 1], [5, 2, 1], [1, 3, 3]
        ]
    }
];
