CREATE TYPE "public"."feature_type" AS ENUM('AUTHENTICATION', 'DATABASE', 'PAYMENTS');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('ACTIVE', 'INACTIVE', 'DEPRECATED', 'PENDING');--> statement-breakpoint
CREATE TYPE "public"."scope" AS ENUM('FRONTEND', 'BACKEND', 'FULLSTACK');--> statement-breakpoint
CREATE TABLE "features" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"feature_type" "feature_type" NOT NULL,
	"name" text NOT NULL,
	"repo_name" text NOT NULL,
	"status" "status" DEFAULT 'PENDING',
	"is_experimental" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "framework_features" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"framework_id" uuid NOT NULL,
	"feature_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "framework_features_framework_id_feature_id_unique" UNIQUE("framework_id","feature_id")
);
--> statement-breakpoint
CREATE TABLE "frameworks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"repo_name" text NOT NULL,
	"status" "status" DEFAULT 'PENDING',
	"is_experimental" boolean DEFAULT false NOT NULL,
	"scopes" "scope"[] NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "framework_features" ADD CONSTRAINT "framework_features_framework_id_frameworks_id_fk" FOREIGN KEY ("framework_id") REFERENCES "public"."frameworks"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "framework_features" ADD CONSTRAINT "framework_features_feature_id_features_id_fk" FOREIGN KEY ("feature_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;