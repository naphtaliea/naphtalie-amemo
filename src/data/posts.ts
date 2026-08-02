export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
}

export const POSTS: Post[] = [
  {
    id: "rapidboost-security-assessment",
    title: "Auditing RapidBoost: Finding a Critical Access-Control Flaw",
    slug: "rapidboost-security-assessment",
    excerpt:
      "A walkthrough of an independent penetration test I ran against RapidBoost, a platform I built myself, including a critical database access-control issue I found and fixed.",
    content: `Testing your own production app is a different experience from testing a lab target — there's a real user base and real data on the line. I ran an independent security assessment against RapidBoost, an e-commerce/SMM platform I built and maintain, treating it the way I would treat a client engagement.

The most serious finding was a database access-control flaw that could have allowed broader data access than intended. I documented the issue, the exploitation path, and the remediation steps, then verified the fix closed the gap without breaking existing functionality.

Beyond the critical finding, the assessment turned up a handful of lower-severity issues around input validation and error handling, all of which got tracked and resolved. This post covers the methodology I used and what I'd do differently next time.`,
    category: "Penetration Testing",
    date: "2026-07-10",
  },
  {
    id: "home-siem-lab-wazuh",
    title: "Setting Up a Home SIEM Lab with Wazuh",
    slug: "home-siem-lab-wazuh",
    excerpt:
      "How I built a home security operations lab using Wazuh, Kali Linux, and Metasploitable 2 to practice detection and response.",
    content: `Building a home lab is one of the best ways to get hands-on with security operations without needing production access. I set up Wazuh as a SIEM to collect and analyze logs from a small network of virtual machines, including a Kali Linux attack box and a deliberately vulnerable Metasploitable 2 target.

This post walks through the lab topology, how I configured Wazuh agents on each host, and a few detection rules I wrote to catch common attack patterns like brute-force login attempts and unexpected outbound connections.

Running attacks from Kali against Metasploitable while watching alerts fire in Wazuh in real time was the most useful part of the exercise — it closes the loop between "knowing" an attack technique and actually seeing what it looks like from a defender's seat.`,
    category: "Home Lab",
    date: "2026-06-15",
  },
  {
    id: "food-delivery-app-security-assessment",
    title: "CVEs and CWEs in a Food-Delivery App: An Academic Security Assessment",
    slug: "food-delivery-app-security-assessment",
    excerpt:
      "A security assessment of a food-delivery mobile application, covering a denial-of-service vulnerability and insecure token storage, done as an academic project.",
    content: `For this academic project, I performed a structured security assessment of a food-delivery mobile application, mapping findings to CVE/CWE classifications to practice the kind of documentation used in professional vulnerability reports.

Two findings stood out: a denial-of-service vulnerability that could degrade availability under crafted requests, and insecure token storage that left session tokens more exposed than they should have been on the device. For each, I documented the CWE category, a proof-of-concept reproduction, impact analysis, and recommended remediation.

This exercise reinforced how much documentation quality matters in security work — a finding is only as useful as the report that explains it clearly enough for a development team to act on.`,
    category: "Mobile Security",
    date: "2026-05-20",
  },
];

export const getCaseNumber = (slug: string) => {
  const chronological = [...POSTS].sort((a, b) => (a.date > b.date ? 1 : -1));
  const index = chronological.findIndex((p) => p.slug === slug);
  return `CASE-${String(index + 1).padStart(3, "0")}`;
};
