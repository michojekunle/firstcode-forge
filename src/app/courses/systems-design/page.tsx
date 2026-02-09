"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Rocket,
  Star,
  Users,
  Lock,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

// Import interactive components
import { LiveCodeEditor } from "@/components/learning/LiveCodeEditor";
import {
  StateFlowAnimation,
  ConceptFlowDiagram,
} from "@/components/learning/AnimatedConcept";
import {
  ExplainLikeFive,
  StepByStepBreakdown,
  VisualComparison,
} from "@/components/learning/ConceptBreakdown";
import {
  ConceptChips,
  KeyPointCallout,
  ProgressMilestone,
} from "@/components/learning/IconHighlight";
import { ReadMoreLink } from "@/components/learning/ReadMoreLink";
import { DeeperDive } from "@/components/learning/DeeperDive";
import { RealWorldExample } from "@/components/learning/RealWorldExample";
import { ReturnQuizPopup } from "@/components/learning/ReturnQuizPopup";
import { useReturnQuiz } from "@/hooks/useReturnQuiz";

// ============================================
// LESSON DATA
// ============================================
const lessons = [
  {
    id: "thinking",
    title: "Thinking in Systems",
    subtitle: "The Mental Model",
    icon: "🧠",
  },
  {
    id: "scaling",
    title: "Scaling Fundamentals",
    subtitle: "From 1 to 1 Million Users",
    icon: "📈",
  },
  {
    id: "databases",
    title: "Database Design",
    subtitle: "The Heart of Your System",
    icon: "🗄️",
  },
  {
    id: "caching",
    title: "Caching Strategies",
    subtitle: "Speed for Free",
    icon: "⚡",
  },
  {
    id: "distributed",
    title: "Distributed Systems",
    subtitle: "When Monoliths Aren't Enough",
    icon: "🔗",
  },
  {
    id: "challenge",
    title: "Your Design Challenge",
    subtitle: "Put It All Together",
    icon: "🏗️",
  },
];

// ============================================
// LESSON COMPONENTS
// ============================================

function Lesson0() {
  return (
    <div className="space-y-8">
      <ExplainLikeFive
        concept="What is Systems Design?"
        simpleExplanation="Systems Design is like being an architect for software. Before you build a house, you decide where the rooms go, how water flows through pipes, and where the electrical wires run. For software, you design how data flows, where things are stored, and how millions of users can use it at once."
        analogy={{
          icon: "🏠",
          text: "Imagine designing a restaurant. You need to think about: How many customers can fit? Where does the kitchen go? How do orders flow from tables to chefs? That's systems design—but for apps that serve millions!",
        }}
        keywords={[
          {
            word: "Scalability",
            definition:
              "The ability to handle more users/data without breaking",
            icon: "📈",
          },
          {
            word: "Availability",
            definition: "The system is up and running when users need it",
            icon: "🟢",
          },
          {
            word: "Latency",
            definition: "How fast the system responds to requests",
            icon: "⚡",
          },
          {
            word: "Throughput",
            definition: "How many requests the system can handle per second",
            icon: "🚰",
          },
        ]}
        technicalExplanation="Systems design involves making architectural decisions about distributed computing, data storage, caching, load balancing, and failure recovery. It's about trade-offs: you often can't have perfect consistency AND perfect availability (CAP theorem)."
      />

      <StateFlowAnimation
        title="The Request Journey"
        steps={[
          { label: "User", icon: "👤", description: "Makes request" },
          { label: "Load Balancer", icon: "⚖️", description: "Routes traffic" },
          { label: "Server", icon: "🖥️", description: "Processes logic" },
          { label: "Database", icon: "🗄️", description: "Stores data" },
        ]}
      />

      <KeyPointCallout
        icon="💡"
        title="The First Principle"
        description="Every systems design problem comes back to one question: How do we handle MORE? More users, more data, more requests. Design for growth, not for today."
        variant="important"
      />

      <ConceptFlowDiagram
        title="Core Design Concepts"
        description="These building blocks solve 90% of scaling problems"
        nodes={[
          { id: "cache", label: "Caching", icon: "🏃", highlight: true },
          { id: "lb", label: "Load Balancing", icon: "⚖️" },
          { id: "db", label: "Database", icon: "🗄️" },
          { id: "queue", label: "Message Queue", icon: "📬" },
        ]}
        connections={[]}
      />

      <DeeperDive title="Latency Numbers Every Developer Should Know">
        <p className="text-foreground">
          Understanding these orders of magnitude shapes every design decision:
        </p>
        <p>
          <strong className="text-foreground">L1 cache reference:</strong> 0.5
          ns
          <br />
          <strong className="text-foreground">RAM reference:</strong> 100 ns
          <br />
          <strong className="text-foreground">SSD read:</strong> 150,000 ns (150
          µs)
          <br />
          <strong className="text-foreground">
            Round trip same datacenter:
          </strong>{" "}
          500,000 ns (0.5 ms)
          <br />
          <strong className="text-foreground">
            Round trip CA to Netherlands:
          </strong>{" "}
          150,000,000 ns (150 ms)
        </p>
        <p>
          This is why caching matters so much — going from RAM (100ns) to a
          cross-continental database query (150ms) is a{" "}
          <strong>1.5 million times</strong> difference.
        </p>
      </DeeperDive>

      <RealWorldExample
        appName="Twitter"
        concept="Systems thinking in social media"
        description="Twitter processes 500M+ tweets/day. Every tweet must be delivered to millions of followers in real-time. This requires caching (fanout on read vs write), message queues, and distributed databases working in concert."
        icon="🐦"
      />

      <ReadMoreLink
        title="System Design Primer"
        url="https://github.com/donnemartin/system-design-primer"
        topic="systems-thinking"
        description="The most comprehensive free systems design resource"
        icon="🎯"
      />
    </div>
  );
}

function Lesson1() {
  return (
    <div className="space-y-8">
      <ExplainLikeFive
        concept="Vertical vs Horizontal Scaling"
        simpleExplanation="When your system gets slow, you have two choices: get a BIGGER computer (vertical scaling) or get MORE computers (horizontal scaling). Bigger computers have limits. More computers can scale infinitely."
        analogy={{
          icon: "🚗",
          text: "It's like adding passengers. Vertical: Buy a bigger car (seats 8 instead of 4). Horizontal: Add more cars (fleet of vehicles). Eventually, even the biggest bus hits its limit—but you can always add more buses!",
        }}
        keywords={[
          {
            word: "Vertical Scaling",
            definition: "Adding more power to one machine (more CPU, RAM)",
            icon: "⬆️",
          },
          {
            word: "Horizontal Scaling",
            definition: "Adding more machines to distribute load",
            icon: "➡️",
          },
          {
            word: "Load Balancer",
            definition: "Distributes requests across multiple servers",
            icon: "⚖️",
          },
        ]}
      />

      <VisualComparison
        title="Scaling Approaches"
        items={[
          {
            label: "Vertical Scaling",
            icon: "⬆️",
            color: "border-blue-500/30 bg-blue-500/5",
            points: [
              "Simpler to implement",
              "No code changes needed",
              "Has hardware limits",
              "Single point of failure",
            ],
          },
          {
            label: "Horizontal Scaling",
            icon: "➡️",
            color: "border-green-500/30 bg-green-500/5",
            points: [
              "Scales infinitely",
              "Built-in redundancy",
              "Requires load balancer",
              "More complex to manage",
            ],
          },
        ]}
      />

      <LiveCodeEditor
        title="Load Balancer Architecture"
        description="The classic web architecture pattern that handles 10K+ requests/second"
        language="javascript"
        code={`// Load Balancer distributes traffic
       ┌─────────────────────┐
       │      Users          │
       │  (millions of them) │
       └──────────┬──────────┘
                  │
                  ▼
       ┌─────────────────────┐
       │   Load Balancer     │
       │  (NGINX, HAProxy)   │
       └───┬─────┬─────┬─────┘
           │     │     │
           ▼     ▼     ▼
        ┌────┐ ┌────┐ ┌────┐
        │ S1 │ │ S2 │ │ S3 │  ← Web Servers
        └──┬─┘ └──┬─┘ └──┬─┘
           │     │     │
           └─────┼─────┘
                 ▼
       ┌─────────────────────┐
       │     Database        │
       │  (still a bottleneck) │
       └─────────────────────┘`}
      />

      <StepByStepBreakdown
        title="Scaling a Website Step by Step"
        steps={[
          {
            title: "Start with one server",
            description: "App + database on one machine. Fine for <1000 users.",
            icon: "1️⃣",
            codeHint: "EC2 t2.micro → 1 vCPU, 1GB RAM",
          },
          {
            title: "Separate the database",
            description:
              "Move DB to its own server. App server can now scale independently.",
            icon: "2️⃣",
          },
          {
            title: "Add a load balancer",
            description: "Put NGINX in front, add 2-3 app servers behind it.",
            icon: "3️⃣",
          },
          {
            title: "Add caching",
            description: "Redis/Memcached reduces DB load by 90%.",
            icon: "4️⃣",
          },
          {
            title: "Database replication",
            description:
              "Read replicas handle read traffic, master handles writes.",
            icon: "5️⃣",
          },
        ]}
      />

      <KeyPointCallout
        icon="🎯"
        title="The 80/20 Rule"
        description="80% of scaling problems are solved by: load balancers, caching, and database indexing. Master these before exploring complex solutions."
        variant="tip"
      />

      <DeeperDive title="CAP Theorem — The Impossible Triangle">
        <p className="text-foreground">
          In distributed systems, you can only guarantee{" "}
          <strong>two out of three</strong>:
        </p>
        <VisualComparison
          title="CAP Theorem"
          items={[
            {
              label: "Consistency",
              icon: "✅",
              color: "border-blue-500/30 bg-blue-500/5",
              points: [
                "Every read gets the latest write",
                "All nodes see same data",
                "Banking requires this",
              ],
            },
            {
              label: "Availability",
              icon: "🟢",
              color: "border-green-500/30 bg-green-500/5",
              points: [
                "Every request gets a response",
                "System never refuses service",
                "Social media prioritizes this",
              ],
            },
            {
              label: "Partition Tolerance",
              icon: "🛡️",
              color: "border-orange-500/30 bg-orange-500/5",
              points: [
                "System works despite network failures",
                "Required in distributed systems",
                "You always need this",
              ],
            },
          ]}
        />
        <p>
          Since partition tolerance is mandatory, the real choice is:{" "}
          <strong>CP</strong> (consistent but might refuse requests) or{" "}
          <strong>AP</strong> (always available but might serve stale data).
        </p>
      </DeeperDive>

      <RealWorldExample
        appName="Amazon DynamoDB"
        concept="Horizontal scaling in production"
        description="DynamoDB automatically partitions data across thousands of servers. It chose AP (availability + partition tolerance), using 'eventual consistency' where reads might be slightly stale but the system never goes down."
        icon="☁️"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <ReadMoreLink
          title="CAP Theorem Explained"
          url="https://www.ibm.com/topics/cap-theorem"
          topic="cap-theorem"
          description="Clear explanation with real database examples"
        />
        <ReadMoreLink
          title="Load Balancing Algorithms"
          url="https://www.nginx.com/resources/glossary/load-balancing/"
          topic="cap-theorem"
          description="Round-robin, least connections, IP hash, and more"
          icon="⚖️"
        />
      </div>
    </div>
  );
}

function Lesson2() {
  return (
    <div className="space-y-8">
      <ExplainLikeFive
        concept="SQL vs NoSQL Databases"
        simpleExplanation="Databases are like filing cabinets. SQL databases are like organized cabinets with strict folders—everything has its place. NoSQL databases are like flexible storage bins—throw anything in, but finding it might be different each time."
        analogy={{
          icon: "📁",
          text: "SQL = Library with Dewey Decimal. Every book has a specific shelf. NoSQL = Your bedroom closet. Flexible, but organization depends on you!",
        }}
        keywords={[
          {
            word: "SQL",
            definition:
              "Structured Query Language. Tables with rows and columns. Relationships enforced.",
            icon: "📊",
          },
          {
            word: "NoSQL",
            definition:
              "Not Only SQL. Documents, key-value, graphs. More flexible schema.",
            icon: "📄",
          },
          {
            word: "ACID",
            definition:
              "Atomicity, Consistency, Isolation, Durability. SQL guarantees.",
            icon: "🔒",
          },
          {
            word: "CAP Theorem",
            definition:
              "Can only have 2 of: Consistency, Availability, Partition tolerance",
            icon: "⚠️",
          },
        ]}
      />

      <VisualComparison
        title="Database Types Compared"
        items={[
          {
            label: "SQL (PostgreSQL, MySQL)",
            icon: "📊",
            color: "border-blue-500/30 bg-blue-500/5",
            points: [
              "Strict schema (tables, columns)",
              "Complex queries with JOINs",
              "ACID transactions",
              "Best for: Financial, relational data",
            ],
          },
          {
            label: "NoSQL (MongoDB, Redis)",
            icon: "📄",
            color: "border-purple-500/30 bg-purple-500/5",
            points: [
              "Flexible schema (documents)",
              "Horizontal scaling built-in",
              "Eventually consistent",
              "Best for: Social feeds, real-time data",
            ],
          },
        ]}
      />

      <LiveCodeEditor
        title="Database Indexing"
        description="Indexes are like a book's table of contents—they help you find data fast"
        language="typescript"
        code={`// Without index: Scan ALL rows (O(n))
// Finding John in 1 million users = check 1 million rows 😱

SELECT * FROM users WHERE email = 'john@example.com';
-- Time: 2400ms (full table scan)

// With index: Jump directly (O(log n))
// Finding John = check ~20 rows 🚀

CREATE INDEX idx_users_email ON users(email);

SELECT * FROM users WHERE email = 'john@example.com';
-- Time: 0.2ms (index lookup)

// ⚠️ Trade-offs
// - Extra storage (10-30% more)
// - Slower writes (index must update)
// - Maintenance overhead

// Rule: Index columns you search/filter by frequently`}
      />

      <StateFlowAnimation
        title="Database Read/Write Split"
        steps={[
          { label: "App", icon: "📱", description: "Sends query" },
          { label: "Router", icon: "🔀", description: "Read or write?" },
          { label: "Master", icon: "✍️", description: "Handles writes" },
          { label: "Replica", icon: "📖", description: "Handles reads" },
        ]}
      />

      <KeyPointCallout
        icon="📈"
        title="The Read/Write Ratio"
        description="Most apps are 90% reads, 10% writes. Use read replicas to scale reads infinitely while keeping one master for writes."
        variant="tip"
      />

      <DeeperDive title="Database Sharding — Splitting the Giant">
        <p className="text-foreground">
          When a single database can&apos;t handle the load, you{" "}
          <strong>shard</strong> it — splitting data across multiple databases
          by a key.
        </p>
        <p>
          <strong className="text-foreground">Common strategies:</strong>
          <br />
          <strong>• Range-based:</strong> Users A-M on shard 1, N-Z on shard 2
          (can be uneven)
          <br />
          <strong>• Hash-based:</strong> hash(userId) % numShards (even
          distribution)
          <br />
          <strong>• Geography-based:</strong> US users on US shard, EU on EU
          shard (low latency)
        </p>
        <p>
          <strong className="text-foreground">The challenge:</strong>{" "}
          Cross-shard queries are expensive. If user data is on shard 1 but
          their orders are on shard 3, you need to query both. This is why shard
          key selection is critical.
        </p>
      </DeeperDive>

      <RealWorldExample
        appName="Instagram"
        concept="PostgreSQL sharding at scale"
        description="Instagram shards its PostgreSQL database by user ID. Each shard handles a subset of users. They built pgbouncer for connection pooling and custom tools for cross-shard migrations."
        icon="📸"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <ReadMoreLink
          title="SQL vs NoSQL Decision Guide"
          url="https://www.mongodb.com/nosql-explained/nosql-vs-sql"
          topic="database-design"
          description="When to choose which database type"
        />
        <ReadMoreLink
          title="Database Indexing Deep Dive"
          url="https://use-the-index-luke.com"
          topic="database-design"
          description="How database indexes work at the B-tree level"
          icon="🌳"
        />
      </div>
    </div>
  );
}

function Lesson3() {
  return (
    <div className="space-y-8">
      <ExplainLikeFive
        concept="Caching"
        simpleExplanation="Caching is remembering things so you don't have to figure them out again. Instead of asking the database 'What are the top posts?' 1000 times per second, you ask once, remember the answer for 60 seconds, and serve that same answer to everyone."
        analogy={{
          icon: "🧠",
          text: "It's like memorizing your frequently-called phone numbers. Instead of looking up 'Mom' in your contacts every time, you just... know it. Caching is your app's short-term memory!",
        }}
        keywords={[
          {
            word: "Cache Hit",
            definition: "Data found in cache. Super fast!",
            icon: "✅",
          },
          {
            word: "Cache Miss",
            definition: "Data not in cache. Must fetch from database.",
            icon: "❌",
          },
          {
            word: "TTL",
            definition: "Time To Live. How long cached data is valid.",
            icon: "⏰",
          },
          {
            word: "Cache Invalidation",
            definition: "Removing stale data from cache.",
            icon: "🗑️",
          },
        ]}
      />

      <StateFlowAnimation
        title="Cache-Aside Pattern"
        steps={[
          { label: "Request", icon: "📨", description: "User asks for data" },
          { label: "Check Cache", icon: "🔍", description: "Is it cached?" },
          { label: "Cache Hit?", icon: "❓", description: "Yes → Return fast" },
          { label: "DB Query", icon: "🗄️", description: "No → Fetch & cache" },
        ]}
      />

      <LiveCodeEditor
        title="Redis Caching Example"
        language="typescript"
        code={`// Cache-aside pattern implementation
async function getUser(userId: string) {
  // Step 1: Check cache first
  const cached = await redis.get(\`user:\${userId}\`);
  
  if (cached) {
    console.log('Cache HIT! ⚡');
    return JSON.parse(cached);
  }
  
  // Step 2: Cache miss - fetch from database
  console.log('Cache MISS - fetching from DB');
  const user = await db.users.findById(userId);
  
  // Step 3: Store in cache for next time
  await redis.setex(
    \`user:\${userId}\`,
    3600,  // TTL: 1 hour
    JSON.stringify(user)
  );
  
  return user;
}

// Performance difference:
// Without cache: 50ms (database query)
// With cache:    0.5ms (memory lookup)
// 100x faster! 🚀`}
      />

      <StepByStepBreakdown
        title="Where to Add Caching"
        steps={[
          {
            title: "Browser Cache",
            description: "Cache static assets (images, CSS, JS) in the browser",
            icon: "🌐",
            codeHint: "Cache-Control: max-age=31536000",
          },
          {
            title: "CDN Cache",
            description: "Cloudflare, AWS CloudFront cache content at edge",
            icon: "🌍",
          },
          {
            title: "Application Cache",
            description: "Redis/Memcached for database query results",
            icon: "⚡",
          },
          {
            title: "Database Cache",
            description: "Query result caching, buffer pools",
            icon: "🗄️",
          },
        ]}
      />

      <KeyPointCallout
        icon="⚠️"
        title="Cache Invalidation"
        description="'There are only two hard things in computer science: cache invalidation and naming things.' — Phil Karlton. When data changes, make sure to update or delete the cached version!"
        variant="warning"
      />

      <DeeperDive title="Cache Strategies — Write-Through vs Write-Behind">
        <p className="text-foreground">
          How you keep cache and database in sync depends on your consistency
          needs:
        </p>
        <p>
          <strong className="text-foreground">
            Cache-Aside (Lazy Loading):
          </strong>{" "}
          App checks cache first. On miss, reads from DB and populates cache.
          Most common pattern.
        </p>
        <p>
          <strong className="text-foreground">Write-Through:</strong> Every
          write goes to both cache AND DB. Ensures consistency but adds write
          latency.
        </p>
        <p>
          <strong className="text-foreground">
            Write-Behind (Write-Back):
          </strong>{" "}
          Write to cache first, then asynchronously write to DB. Fastest writes,
          but risk of data loss if cache fails.
        </p>
      </DeeperDive>

      <RealWorldExample
        appName="Netflix"
        concept="Multi-layer caching"
        description="Netflix uses EVCache (based on Memcached) to cache everything from user profiles to video metadata. They serve 200B+ requests/day from cache, keeping database load manageable."
        icon="🎬"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <ReadMoreLink
          title="Caching Strategies Guide"
          url="https://codeahoy.com/2017/08/11/caching-strategies-and-how-to-choose-the-right-one/"
          topic="caching"
          description="When to use which caching pattern"
        />
        <ReadMoreLink
          title="Redis Documentation"
          url="https://redis.io/docs/"
          topic="caching"
          description="Master the most popular caching solution"
          icon="🟥"
        />
      </div>
    </div>
  );
}

function Lesson4() {
  return (
    <div className="space-y-8">
      <ExplainLikeFive
        concept="Microservices"
        simpleExplanation="A monolith is like one giant restaurant where one kitchen does everything. Microservices are like a food court—each stall specializes in one thing (pizza, sushi, tacos). They work together but are independent."
        analogy={{
          icon: "🏪",
          text: "Food court = microservices. If the pizza place catches fire, sushi and tacos keep serving. If one giant kitchen catches fire, everyone starves!",
        }}
        keywords={[
          {
            word: "Monolith",
            definition: "One big application doing everything together",
            icon: "🏛️",
          },
          {
            word: "Microservice",
            definition: "Small, independent service doing one thing well",
            icon: "🧩",
          },
          {
            word: "API Gateway",
            definition: "Single entry point that routes to microservices",
            icon: "🚪",
          },
          {
            word: "Message Queue",
            definition:
              "Async communication between services (Kafka, RabbitMQ)",
            icon: "📬",
          },
        ]}
      />

      <VisualComparison
        title="Monolith vs Microservices"
        items={[
          {
            label: "Monolith",
            icon: "🏛️",
            color: "border-yellow-500/30 bg-yellow-500/5",
            points: [
              "Simple to deploy",
              "Easy to understand initially",
              "One codebase, one deploy",
              "Becomes unmanageable at scale",
            ],
          },
          {
            label: "Microservices",
            icon: "🧩",
            color: "border-green-500/30 bg-green-500/5",
            points: [
              "Scale services independently",
              "Teams work independently",
              "Fault isolation",
              "Complex to orchestrate",
            ],
          },
        ]}
      />

      <LiveCodeEditor
        title="Microservices Architecture"
        language="typescript"
        code={`// E-commerce Microservices Architecture

                    ┌──────────────┐
                    │  API Gateway │
                    │   (Kong)     │
                    └──────┬───────┘
           ┌───────────┬───┴───┬───────────┐
           ▼           ▼       ▼           ▼
    ┌──────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
    │  Users   │ │ Products│ │ Orders  │ │Payments │
    │ Service  │ │ Service │ │ Service │ │ Service │
    └────┬─────┘ └────┬────┘ └────┬────┘ └────┬────┘
         │            │           │           │
         ▼            ▼           ▼           ▼
    ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐
    │User DB │  │Prod DB │  │OrderDB │  │Pay DB  │
    └────────┘  └────────┘  └────────┘  └────────┘

// Each service:
// - Has its own database
// - Deploys independently  
// - Scales independently
// - Can use different tech stacks`}
      />

      <ConceptFlowDiagram
        title="Async Communication"
        description="Services communicate via message queues for reliability"
        nodes={[
          { id: "order", label: "Order Service", icon: "🛒", highlight: true },
          { id: "queue", label: "Kafka", icon: "📬" },
          { id: "payment", label: "Payment", icon: "💳" },
          { id: "email", label: "Email", icon: "📧" },
        ]}
        connections={[]}
      />

      <KeyPointCallout
        icon="🎯"
        title="Start Simple"
        description="Don't start with microservices! Begin with a well-structured monolith. Split into services only when you have clear scaling bottlenecks or team size requires it."
        variant="important"
      />

      <DeeperDive title="Event-Driven Architecture — The Glue Between Services">
        <p className="text-foreground">
          Microservices need to communicate. <strong>Synchronous</strong> calls
          (HTTP/gRPC) create tight coupling. <strong>Asynchronous</strong>{" "}
          events decouple services.
        </p>
        <p>
          <strong className="text-foreground">Event Sourcing:</strong> Instead
          of storing current state, store every event that happened. &quot;User
          created,&quot; &quot;Address updated,&quot; &quot;Order placed.&quot;
          Replay events to reconstruct state at any point in time.
        </p>
        <p>
          <strong className="text-foreground">CQRS:</strong> Command Query
          Responsibility Segregation. Separate the write model (optimized for
          writes) from the read model (denormalized for fast queries). Use
          events to sync them.
        </p>
      </DeeperDive>

      <RealWorldExample
        appName="Uber"
        concept="Microservices at extreme scale"
        description="Uber runs 4000+ microservices. Their domain-oriented architecture groups services by business domain (ride, payment, driver). Services communicate asynchronously via Apache Kafka, processing 1 trillion+ messages/day."
        icon="🚕"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <ReadMoreLink
          title="Microservices Patterns"
          url="https://microservices.io/patterns/index.html"
          topic="microservices"
          description="Complete catalog of microservice design patterns"
        />
        <ReadMoreLink
          title="Martin Fowler on Microservices"
          url="https://martinfowler.com/articles/microservices.html"
          topic="microservices"
          description="The definitive article on microservice architecture"
          icon="📝"
        />
      </div>
    </div>
  );
}

function Lesson5({ onGenerateChallenge }: { onGenerateChallenge: () => void }) {
  const { user } = useAuth();
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const handleChallengeClick = () => {
    if (!user) {
      setShowAuthPrompt(true);
    } else {
      onGenerateChallenge();
    }
  };

  return (
    <div className="space-y-8">
      <Card
        hover={false}
        className="p-8 text-center bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border-primary/30"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring" }}
        >
          <span className="text-6xl mb-4 block">🏗️</span>
          <h2 className="text-2xl font-bold mb-2">
            You Think Like an Architect Now!
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            You&apos;ve learned the foundations of systems design. Time to
            design your own system.
          </p>

          <ConceptChips
            title="Concepts Mastered"
            concepts={[
              {
                icon: "📈",
                label: "Scaling",
                definition: "Vertical and horizontal scaling strategies",
              },
              {
                icon: "🗄️",
                label: "Databases",
                definition: "SQL vs NoSQL, indexing, replication",
              },
              {
                icon: "⚡",
                label: "Caching",
                definition: "Redis, TTL, cache invalidation",
              },
              {
                icon: "🧩",
                label: "Microservices",
                definition: "Service decomposition and communication",
              },
              {
                icon: "⚖️",
                label: "Load Balancing",
                definition: "Distributing traffic across servers",
              },
            ]}
          />
        </motion.div>
      </Card>

      {showAuthPrompt && !user ? (
        <Card hover={false} className="p-8 border-2 border-primary/50">
          <div className="text-center">
            <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Sign In to Continue</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Create an account to get your personalized systems design
              challenge.
            </p>
            <Link href="/onboarding">
              <Button glow size="lg" className="gap-2">
                <Sparkles className="w-4 h-4" />
                Get Started
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <Card hover={false} className="p-8">
          <div className="text-center">
            <Rocket className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Your Design Challenge</h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Design a real system from scratch. I&apos;ll generate a unique
              challenge based on what you&apos;ve learned.
            </p>
            <Button
              onClick={handleChallengeClick}
              glow
              size="lg"
              className="gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Generate System Design Challenge
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

// ============================================
// MAIN PAGE
// ============================================
export default function SystemsDesignPage() {
  const courseId = "systems-design";
  const { getCourseProgress, setCourseProgress, profile } = useAppStore();
  const { user } = useAuth();

  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      return getCourseProgress(courseId);
    }
    return [];
  });
  const [generatingChallenge, setGeneratingChallenge] = useState(false);
  const [generatedChallenge, setGeneratedChallenge] = useState<null | {
    title: string;
    description: string;
    difficulty: string;
    steps: string[];
  }>(null);

  const stats = { rating: 4.9, students: 945 };

  useEffect(() => {
    if (completedLessons.length > 0) {
      setCourseProgress(courseId, completedLessons);
    }
  }, [completedLessons, setCourseProgress]);

  const lesson = lessons[currentLesson];

  const goNext = () => {
    if (currentLesson < lessons.length - 1) {
      if (!completedLessons.includes(currentLesson)) {
        setCompletedLessons([...completedLessons, currentLesson]);
      }
      setCurrentLesson(currentLesson + 1);
    }
  };

  const goPrev = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const finishCourse = () => {
    if (!completedLessons.includes(currentLesson)) {
      setCompletedLessons([...completedLessons, currentLesson]);
    }
  };

  const generateChallenge = async () => {
    setGeneratingChallenge(true);
    try {
      const response = await fetch("/api/challenges/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          userId: user?.id,
          userSurvey: profile,
        }),
      });
      const data = await response.json();
      if (data.challenge) {
        setGeneratedChallenge(data.challenge);
      }
    } catch (error) {
      console.error("Failed to generate challenge:", error);
    } finally {
      setGeneratingChallenge(false);
    }
  };

  const renderLessonContent = () => {
    switch (currentLesson) {
      case 0:
        return <Lesson0 />;
      case 1:
        return <Lesson1 />;
      case 2:
        return <Lesson2 />;
      case 3:
        return <Lesson3 />;
      case 4:
        return <Lesson4 />;
      case 5:
        return <Lesson5 onGenerateChallenge={generateChallenge} />;
      default:
        return <Lesson0 />;
    }
  };

  // Return quiz popup integration
  const {
    quizQuestion,
    isVisible: quizVisible,
    dismiss: dismissQuiz,
    complete: completeQuiz,
  } = useReturnQuiz();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      {/* Return Quiz Popup */}
      {quizVisible && quizQuestion && (
        <ReturnQuizPopup
          question={quizQuestion}
          onDismiss={dismissQuiz}
          onComplete={completeQuiz}
        />
      )}
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/learn"
            className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>

          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{lesson.icon}</span>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">
                  {lesson.title}
                </h1>
                <p className="text-primary font-playful">{lesson.subtitle}</p>
              </div>
            </div>

            <div className="text-right text-sm text-muted-foreground">
              <div className="flex items-center gap-1 justify-end">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">{stats.rating}</span>
              </div>
              <div className="flex items-center gap-1 justify-end mt-1">
                <Users className="w-4 h-4" />
                <span>{stats.students} enrolled</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress */}
        <div className="mb-8">
          <ProgressMilestone
            current={completedLessons.length}
            total={lessons.length}
            milestones={[
              { at: 2, icon: "📈", label: "Scaling" },
              { at: 4, icon: "⚡", label: "Caching" },
              { at: 6, icon: "🏗️", label: "Complete" },
            ]}
          />
        </div>

        {/* Lesson selector */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {lessons.map((l, i) => (
            <motion.button
              key={l.id}
              onClick={() => setCurrentLesson(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium shrink-0 transition-all ${
                i === currentLesson
                  ? "bg-primary text-primary-foreground"
                  : completedLessons.includes(i)
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {l.icon} {l.title}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLesson}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            {renderLessonContent()}
          </motion.div>
        </AnimatePresence>

        {/* Generated Challenge */}
        {generatedChallenge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <Card hover={false} className="p-6 border-2 border-primary">
              <div className="flex items-start gap-4">
                <span className="text-4xl">🎯</span>
                <div className="flex-1">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full mb-2 inline-block ${
                      generatedChallenge.difficulty === "easy"
                        ? "bg-green-500/20 text-green-500"
                        : generatedChallenge.difficulty === "medium"
                          ? "bg-yellow-500/20 text-yellow-500"
                          : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {generatedChallenge.difficulty.toUpperCase()}
                  </span>
                  <h3 className="text-xl font-bold">
                    {generatedChallenge.title}
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    {generatedChallenge.description}
                  </p>

                  <div className="mt-4 space-y-2">
                    {generatedChallenge.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-muted-foreground">{step}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Link href="/challenges">
                      <Button glow>Start Challenge</Button>
                    </Link>
                    <Button variant="outline" onClick={generateChallenge}>
                      Generate Another
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-8 border-t border-border">
          <Button
            variant="outline"
            onClick={goPrev}
            disabled={currentLesson === 0}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {completedLessons.includes(currentLesson) && (
              <span className="text-primary flex items-center gap-1 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Completed
              </span>
            )}
          </div>

          <Button
            onClick={
              currentLesson === lessons.length - 1 ? finishCourse : goNext
            }
            glow
            className="gap-2"
          >
            {currentLesson === lessons.length - 1 ? (
              <>
                Finish Course
                <Rocket className="w-4 h-4" />
              </>
            ) : (
              <>
                Next Lesson
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
