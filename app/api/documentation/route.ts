import { NextResponse } from "next/server"

/**
 * GET /api/documentation
 * Returns comprehensive API documentation
 */
export function GET() {
  const documentation = {
    title: "TaeTae Foundation API Documentation",
    version: "1.0.0",
    baseURL: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
    endpoints: {
      donations: {
        list: {
          method: "GET",
          path: "/api/donations",
          description: "Get all donations with optional filters",
          query: {
            program: "Filter by program (skills, education, sports)",
            paymentMethod: "Filter by payment method (stripe, paystack)",
          },
          response: {
            donations: "Array of donation objects",
            count: "Number of results",
            meta: "Pagination and filter metadata",
          },
        },
        create: {
          method: "POST",
          path: "/api/donations",
          description: "Create a new donation record",
          body: {
            name: "Donor name or 'Anonymous'",
            email: "Donor email (required if known mode)",
            program: "Target program (skills, education, sports)",
            amount: "Donation amount",
            currency: "Currency code (USD, NGN)",
            paymentMethod: "Payment method (stripe, paystack)",
            message: "Optional donation message",
            donationMode: "anonymous or known",
          },
        },
        get: {
          method: "GET",
          path: "/api/donations/[id]",
          description: "Get a specific donation",
        },
        update: {
          method: "PUT",
          path: "/api/donations/[id]",
          description: "Update a donation record (admin)",
        },
        delete: {
          method: "DELETE",
          path: "/api/donations/[id]",
          description: "Delete a donation record (admin)",
        },
      },
      paystack: {
        verify: {
          method: "POST",
          path: "/api/paystack/verify",
          description: "Verify a Paystack transaction",
          body: {
            reference: "Paystack transaction reference",
            donationId: "TaeTae donation ID to update",
          },
        },
      },
      boys: {
        list: {
          method: "GET",
          path: "/api/boys",
          description: "Get all boys",
        },
        create: {
          method: "POST",
          path: "/api/boys",
          description: "Register a new boy",
        },
        get: {
          method: "GET",
          path: "/api/boys/[id]",
          description: "Get a specific boy's details",
        },
        update: {
          method: "PUT",
          path: "/api/boys/[id]",
          description: "Update a boy's profile and growth metrics",
        },
      },
      volunteers: {
        list: {
          method: "GET",
          path: "/api/volunteers",
          description: "Get all volunteers",
        },
        create: {
          method: "POST",
          path: "/api/volunteers",
          description: "Register a new volunteer",
        },
      },
      sponsorships: {
        list: {
          method: "GET",
          path: "/api/sponsorships",
          description: "Get all sponsorships",
        },
        create: {
          method: "POST",
          path: "/api/sponsorships",
          description: "Create a new sponsorship",
        },
      },
      admin: {
        stats: {
          method: "GET",
          path: "/api/admin/stats",
          description: "Get aggregated statistics for admin dashboard",
        },
      },
    },
    environment: {
      required: ["STRIPE_SECRET_KEY", "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", "PAYSTACK_SECRET_KEY"],
      optional: ["NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY"],
    },
    paymentMethods: {
      stripe: {
        currency: "USD",
        countries: "Global",
        setup: "Environment variables required",
      },
      paystack: {
        currency: "NGN",
        countries: "Nigeria, Ghana, Kenya, Uganda, South Africa, Ivory Coast",
        setup: "PAYSTACK_SECRET_KEY environment variable required",
      },
    },
  }

  return NextResponse.json(documentation)
}
