/* Boundary Lab editorial content based on Cloudflare security-audit-skill (MIT).
 * These descriptions explain the source workflow; they are not audit results.
 */
window.KBS_CONTENT = {
  domains: [
    {
      id: "core",
      title: "Core security",
      english: "Core security",
      description: "Follow inputs into execution, permissions into business logic. Trace the trust boundaries that connect seemingly separate features.",
      tags: ["Access control", "Injection", "Business logic"],
      sourceFilename: "ATTACK-CLASSES.md"
    },
    {
      id: "ai",
      title: "AI, LLMs & agents",
      english: "AI & agent trust",
      description: "Track whose authority a document, memory, or tool response can invoke. A changed prompt alone does not establish a vulnerability.",
      tags: ["RAG isolation", "Tool authority", "MCP trust"],
      sourceFilename: "AI-AND-LLM.md"
    },
    {
      id: "web",
      title: "HTTP & authentication",
      english: "HTTP & identity",
      description: "Find where proxies and servers interpret requests differently, or tokens and sessions become bound to the wrong identity.",
      tags: ["HTTP parsing", "OAuth & JWT", "Session lifecycle"],
      sourceFilename: "WEB-PROTOCOL-AND-AUTH.md"
    },
    {
      id: "browser",
      title: "Browsers & clients",
      english: "Browser boundaries",
      description: "Follow the DOM, cross-window messages, and browser storage. Verify execution or disclosure paths that affect another user or origin.",
      tags: ["DOM XSS", "Origin checks", "Browser storage"],
      sourceFilename: "CLIENT-SIDE.md"
    },
    {
      id: "supply-chain",
      title: "Supply chain & releases",
      english: "Supply chain & release",
      description: "Trace dependencies through builds, signing, releases, and updates. Identify who can influence the artifact a user ultimately runs.",
      tags: ["CI permissions", "Artifact integrity", "Update trust"],
      sourceFilename: "SUPPLY-CHAIN-AND-RELEASE.md"
    },
    {
      id: "cloud",
      title: "Cloud & deployment",
      english: "Cloud & deployment",
      description: "Inspect workload identities, IAM policies, containers, and runtime settings. Separate the intent in source from facts about a deployment.",
      tags: ["IAM", "Container isolation", "Runtime configuration"],
      sourceFilename: "CLOUD-AND-DEPLOYMENT.md"
    },
    {
      id: "protocols",
      title: "RPC & messaging",
      english: "RPC & messaging",
      description: "Look beyond message shape to sender identity, authority, and delivery order. Follow state changes through retries and duplicate processing.",
      tags: ["Peer identity", "Queue isolation", "Replay & ordering"],
      sourceFilename: "PROTOCOLS-RPC-AND-MESSAGING.md"
    },
    {
      id: "availability",
      title: "Resources & availability",
      english: "Resources & availability",
      description: "Examine how small inputs amplify shared CPU, queue, memory, or API costs. Establish impact through bounded local validation.",
      tags: ["Cost amplification", "Quotas", "Cancellation & recovery"],
      sourceFilename: "RESOURCE-EXHAUSTION-AND-AVAILABILITY.md"
    },
    {
      id: "data",
      title: "Data isolation & lifecycle",
      english: "Data isolation & lifecycle",
      description: "Follow every copy through caches, search, exports, backups, and restores. Check that access controls and deletion guarantees travel with the data.",
      tags: ["Tenant isolation", "Caches & search", "Deletion & restore"],
      sourceFilename: "DATA-ISOLATION-AND-LIFECYCLE.md"
    },
    {
      id: "native",
      title: "Desktop & mobile",
      english: "Native apps & local IPC",
      description: "Trace external inputs through deep links, webview bridges, and local daemons. Verify the caller's actual identity and the final target of each operation.",
      tags: ["Deep links", "Native bridges", "Local IPC"],
      sourceFilename: "DESKTOP-MOBILE-AND-LOCAL-IPC.md"
    },
    {
      id: "memory",
      title: "Memory & binaries",
      english: "Memory & binary safety",
      description: "Examine buffer bounds, integer arithmetic, object lifetimes, FFI, and loader assumptions. A crash alone does not prove code execution.",
      tags: ["Bounds & lifetimes", "FFI & ABI", "Concurrency"],
      sourceFilename: "MEMORY-SAFETY-AND-BINARY.md"
    }
  ],
  phases: [
    {
      title: "Map the attack surface.",
      short: "Reconnaissance & scope",
      description: "Map the architecture, entry points, trust boundaries, and prior evidence. Record the planned coverage before the hunt begins.",
      artifact: "architecture.md · coverage-ledger.json"
    },
    {
      title: "Follow the gaps.",
      short: "Coverage-led hunting",
      description: "Assign planned review units to isolated agents. Record their checks, then have separate reviewers challenge the coverage and identify unresolved paths.",
      artifact: "coverage-ledger.json · candidate records"
    },
    {
      title: "Challenge the hypothesis.",
      short: "Independent validation",
      description: "A verifier who did not discover the candidate tries to disprove it. Source traces and bounded validation establish whether a real boundary failure has an observable effect.",
      artifact: "Validation evidence for each candidate"
    },
    {
      title: "Give evidence structure.",
      short: "Verdicts & schema checks",
      description: "Record confirmed, needs_validation, and rejected findings in JSON. For unresolved items, state the exact fact that still needs to be established.",
      artifact: "findings.json · report-schema.json"
    },
    {
      title: "Verify the final record.",
      short: "Independent record review",
      description: "Fresh reviewers check the final source claims and supporting evidence. Material replacements receive another independent verification.",
      artifact: "Verified findings.json"
    },
    {
      title: "Make the next decision clear.",
      short: "Results & open questions",
      description: "Build reports from verified records and the coverage ledger. Present demonstrated impact, the smallest effective fix, and the facts that still need validation.",
      artifact: "REPORT.md · FINDINGS-DETAIL.md · NEEDS-VALIDATION.md"
    }
  ],
  faqs: [
    {
      question: "Can I scan code on this website?",
      answer: "Boundary Lab is an interactive guide to the audit workflow. Its demos illustrate the process and are not live scan results. Actual audits run in a coding agent with the security-audit skill installed and access to the target codebase."
    },
    {
      question: "What do the three verdicts mean?",
      answer: "Confirmed means a complete source trace and bounded observed result establish a boundary failure. Needs_validation identifies an exact unresolved fact and receives no severity. Rejected records a candidate whose claim was disproved during validation."
    },
    {
      question: "Does every audit cover all 11 areas?",
      answer: "The core attack classes and 10 specialist areas provide a starting point for scope. Select the areas that match the application and the requested review. Unfinished and out-of-scope work never counts as covered, and a single audit cannot guarantee the absence of vulnerabilities."
    },
    {
      question: "What do I need to run an audit?",
      answer: "You need a coding agent that supports tool use and parallel sub-agents, plus Node.js for the validators. Executing target code requires an OS-enforced sandbox with network, write, and resource restrictions. Missing execution controls or external facts remain explicit validation blockers."
    }
  ]
};
