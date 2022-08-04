CREATE DATABASE "HOA"


    CREATE TABLE IF NOT EXISTS public."HomeOwner"
(
    "AccountID" integer NOT NULL,
    "First Name" "char",
    "Last Name" "char",
    "Contact" integer,
    "Email" "char",
    "Address" "char",
    CONSTRAINT "HomeOwner_pkey" PRIMARY KEY ("AccountID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."HomeOwner"
    OWNER to postgres;

    CREATE TABLE IF NOT EXISTS public."Billing"
(
    "TransactionID" integer NOT NULL,
    "AccountID" integer NOT NULL,
    "Water Bill" integer,
    "Monthly Dues" integer,
    CONSTRAINT "Billing_pkey" PRIMARY KEY ("TransactionID"),
    CONSTRAINT "AccountID" FOREIGN KEY ("AccountID")
        REFERENCES public."HomeOwner" ("AccountID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Billing"
    OWNER to postgres;

    CREATE TABLE IF NOT EXISTS public."Visitors"
(
    "VisitorID" integer NOT NULL,
    "AccountID" integer NOT NULL,
    "First Name" "char",
    "Last Name" "char",
    "Contact Number" integer,
    "ID Number" integer,
    CONSTRAINT "Visitors_pkey" PRIMARY KEY ("VisitorID"),
    CONSTRAINT "AccountID" FOREIGN KEY ("AccountID")
        REFERENCES public."HomeOwner" ("AccountID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Visitors"
    OWNER to postgres;