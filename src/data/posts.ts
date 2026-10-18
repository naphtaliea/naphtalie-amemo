export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  /** Slug of the related project in data/projects.ts */
  project?: string;
  featured?: boolean;
}

export const POSTS: Post[] = [
  {
    id: "pos-offline-sale-sync",
    title: "How the Bedarts till stopped losing offline sales",
    slug: "pos-offline-sale-sync",
    excerpt:
      "Three bugs in my offline sale queue, found in live use, and the one rule that fixed them.",
    content: `The till has to keep working when the shop's internet does not. Sales made offline wait in a queue on the device and are sent to the server later. My first version of that queue had three problems, and I found all of them in live use.

The sync popup showed only a count, and its Dismiss button deleted the sale. A "not enough stock" reply from the server was treated as success, so the queued sale was silently thrown away. And a retry after a dropped connection could record the same sale twice.

The fix is one rule: a queued sale leaves the device only after the server confirms it saved. Each sale gets a client reference when it is queued, and the server function returns the sale it already saved instead of creating a duplicate, so a retry is always safe. Sales retry by themselves every 30 seconds and again when the connection returns. When the server refuses a sale, the till shows the real reason and keeps the sale on the device, with options to retry, fix it, or remove it after a confirmation.

I also changed the sale function to return failures as values instead of throwing them. A thrown error reached the screen as a masked React error with no useful message, and a cashier cannot act on that.`,
    category: "Offline Systems",
    project: "bedarts-pos",
    date: "2026-10-04",
  },
  {
    id: "rls-silent-zero-rows",
    title: "When row-level security returns nothing and says nothing",
    slug: "rls-silent-zero-rows",
    excerpt:
      "End-of-day reconciliation ignored refunds because a database read returned zero rows with no error.",
    content: `The end-of-day screen compares the cash a cashier counted with the cash the system expects. The expected figure has to subtract the day's refunds, and on the shared till it was not doing that.

The refunds read returned zero rows with no error. The table's row-level-security policy only lets admin, manager and accountant users read it, and it checks the logged-in account. On a shared till, that account is the terminal itself. The app knows who is at the till from a PIN session, but the database only sees the terminal account, so the policy blocked the read and returned an empty list instead of an error. Empty looked exactly like "no refunds today".

The first fix read refunds through the server-side admin client after the app's own role check, and kept the error check as a second layer. Re-checking that fix turned up the same gap in the code that saves a reconciliation. That one was worse, because it stored a wrong expected-cash figure permanently. It got its own fix.

The lesson I took from it: a failed read and an empty read can look identical, so any money calculation should treat an unexpected empty result as suspicious until proven otherwise.`,
    category: "Database Security",
    project: "bedarts-pos",
    date: "2026-10-09",
  },
  {
    id: "never-trust-the-browser-price",
    title: "Never trust the price the browser sends",
    slug: "never-trust-the-browser-price",
    excerpt:
      "The online order function used the prices and total the customer sent. Here is how I closed that.",
    content: `The online order function took a list of items with prices and a total from the browser and used them as given. Anyone who edited the request could pay almost nothing and still have stock deducted at a price they set themselves.

The fix moves every decision to the server. For each item the function now looks up the current selling price and whether the product is still active, rejects deactivated products, and adds up the total itself. The total sent by the customer is ignored. Stock deduction, the order lines and the payment record all use the server's number.

The storefront got the same treatment. Its order action recomputes prices from the products table, merges duplicate lines and bounds the quantities. The payment webhook refuses to process an order when the amount paid does not match the order total, so a mismatch between what was charged and what was ordered stops there.

The same review found other problems around the same idea, that the client cannot be trusted with anything that matters: a signup path that let anyone choose their own role, and public access to sale and stock functions. All of them are fixed.`,
    category: "Application Security",
    project: "bedarts-pos",
    date: "2026-10-04",
  },
  {
    id: "rapidboost-security-assessment",
    title: "What a pentest of my own platform found",
    slug: "rapidboost-security-assessment",
    excerpt:
      "A public storage bucket, a racy rate limiter and a few smaller holes in RapidBoost, and how each was fixed.",
    content: `Testing your own live app is different from testing a lab target, because real users and real payment data are on the line. I ran a penetration test against RapidBoost, the platform I built, and wrote up each finding with a severity and a fix.

The critical finding was a storage bucket that anyone could read from and write to without logging in. It held users' payment screenshots, and the file names contained user IDs. The fix made the bucket private, limited uploads to logged-in users whose file name starts with their own ID, and made the admin panel use short-lived signed links.

The rate limiter on payment-session creation had a race. It read a count, checked it, then inserted, so 25 simultaneous requests could all read zero and all pass. I replaced it with a single atomic check that holds an advisory lock, then confirmed with 25 simultaneous requests that only the allowed number got through.

The smaller fixes: anonymous access to pricing functions was revoked, order responses stopped returning supplier details by listing exact columns instead of selecting everything, and a redirect parameter now accepts only my own domains, which closed an open redirect.

Each fix was checked again after it shipped. The one I would test for earlier next time is concurrency, because the original limiter looked correct until I sent requests in parallel.`,
    category: "Penetration Testing",
    project: "rapidboost",
    featured: true,
    date: "2026-08-18",
  },
  {
    id: "food-delivery-app-security-assessment",
    title: "A security assessment of a food-delivery app",
    slug: "food-delivery-app-security-assessment",
    excerpt:
      "An academic assessment of a food-delivery mobile app, with findings documented as CVEs and CWEs.",
    content: `For an academic project I assessed a food-delivery mobile app and documented multiple CVEs and CWEs. Two findings stood out: a denial-of-service flaw and insecure token storage.

Mapping each finding to a CWE category makes you describe exactly what is wrong, and that is the part a development team needs first. A finding is only as useful as the report that explains it clearly enough to be fixed.`,
    category: "Mobile Security",
    date: "2026-05-20",
  },
  {
    id: "home-siem-lab-wazuh",
    title: "My home security lab",
    slug: "home-siem-lab-wazuh",
    excerpt:
      "A small lab with Wazuh, Kali Linux and Metasploitable 2 for practising penetration testing.",
    content: `I keep a home lab for practising penetration testing: Wazuh as the SIEM, a Kali Linux machine to attack from, and Metasploitable 2 as a deliberately vulnerable target.

The point of the lab is to attack something I am allowed to break, and to see what the defender's tooling records while I do it.`,
    category: "Home Lab",
    date: "2026-06-15",
  },
];

export const readingMinutes = (post: Post) => Math.max(1, Math.round(post.content.split(/\s+/).length / 200));

/** Featured post first, then newest first. */
export const sortedPosts = () =>
  [...POSTS].sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || (a.date < b.date ? 1 : -1));

export const getCaseNumber = (slug: string) => {
  const chronological = [...POSTS].sort((a, b) => (a.date > b.date ? 1 : -1));
  const index = chronological.findIndex((p) => p.slug === slug);
  return `CASE-${String(index + 1).padStart(3, "0")}`;
};
