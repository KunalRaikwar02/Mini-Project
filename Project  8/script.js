const users = [
    {
        fullName: "Aarav Mehta",
        image: "https://plus.unsplash.com/premium_photo-1763734616837-b51f49ceaab5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8dG93SlpGc2twR2d8fGVufDB8fHx8fA%3D%3D",
        profession: "UX Designer",
        description: "Designs apps that feel human. Loves coffee & pixel-perfect layouts.",
        tags: ["Figma", "UI/UX", "Design Systems", "Freelancer"]
    },
    {
        fullName: "Megna Sharma",
        image: "https://plus.unsplash.com/premium_photo-1763734617102-a7e225a08758?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3wyfHx8ZW58MHx8fHx8",
        profession: "Software Engineer",
        description: "Writes clean code and breaks things just to fix them better.",
        tags: ["React", "TypeScript", "Open Source", "Tech Speaker"]
    },
    {
        fullName: "Varun Mehta",
        image: "https://plus.unsplash.com/premium_photo-1733701621462-a74d3d408319?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIyfHx8ZW58MHx8fHx8",
        profession: "Data Scientist",
        description: "Finds patterns in the noise. Speaks fluently in charts and numbers.",
        tags: ["Python", "AI", "Machine Learning", "Analytics"]
    },
    {
        fullName: "Noah Williams",
        image: "https://plus.unsplash.com/premium_photo-1672322565907-932e7554b1cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI2fHx8ZW58MHx8fHx8",
        profession: "Content Creator",
        description: "Makes complex topics easy. Lives on caffeine and camera angles.",
        tags: ["Video Editing", "Education", "YouTube", "Storytelling"]
    },
    {
        fullName: "Kim Sung",
        image: "https://plus.unsplash.com/premium_photo-1727265735669-78f0f6d5b299?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQzfHx8ZW58MHx8fHx8",
        profession: "Content Creator",
        description: "Makes complex topics easy. Lives on caffeine and camera angles.",
        tags: ["Video Editing", "Education", "YouTube", "Storytelling"]
    },
    {
        fullName: "Riya Kapoor",
        image: "https://images.unsplash.com/photo-1762764919450-560fd6515192?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI4fHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
        profession: "Full-Stack Developer",
        description: "Turns coffee into scalable web apps.Loves JavaScript more than people.",
        tags: ["Node.js", "MongoDB", "DevOps", "Docker"]
    },
    {
        fullName: "Song Jung",
        image: "https://plus.unsplash.com/premium_photo-1688497830987-e4f7ce4da50b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDY4fHx8ZW58MHx8fHx8",
        profession: "Digital Marketer",
        description: "Builds brands that trend without ads. Meme-based strategies only.",
        tags: ["SEO", "Branding", "Social Media", "Influencer Collab"]
    },
    {
        fullName: "Ishaan Verma",
        image: "https://plus.unsplash.com/premium_photo-1763734967053-59afdce44bde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDU2fHx8ZW58MHx8fHx8",
        profession: "Game Developer",
        description: "Writes bugs called features. Spent more time in Unity than real life.",
        tags: ["Unity", "C#", "3D Modeling", "Multiplayer"]
    }
];

var sum = ''

users.forEach(function (elem) {
    sum = sum + `<div class="card">
      <img src="${elem.image}" alt="">
      <h3>${elem.fullName}</h3>
      <h4>${elem.profession}</h4>
      <p>${elem.description}</p>
    </div>`
})

var main = document.querySelector('main')
main.innerHTML = sum