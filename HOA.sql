CREATE DATABASE "HOA"


CREATE TABLE IF NOT EXISTS public."HomeOwner"
(
    "AccountID" integer NOT NULL,
    "First Name" "char",
    "Last Name" "char",
    "Contact" integer,
    "Email" "char",
    CONSTRAINT "HomeOwner_pkey" PRIMARY KEY ("AccountID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."HomeOwner"
    OWNER to postgres;



    CREATE TABLE IF NOT EXISTS public."Transactions"
(
    "TransactionID" integer NOT NULL,
    "AccountID" integer NOT NULL,
    "BillID" integer NOT NULL,
    CONSTRAINT "Billing_pkey" PRIMARY KEY ("TransactionID"),
    CONSTRAINT "AccountID" FOREIGN KEY ("AccountID")
        REFERENCES public."HomeOwner" ("AccountID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "BillID" FOREIGN KEY ("BillID")
        REFERENCES public."Bill" ("BillID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Transactions"
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


    CREATE TABLE IF NOT EXISTS public."Bill"
(
    "BillID" integer NOT NULL,
    "Name" "char",
    "Amount" integer,
    CONSTRAINT "Bill_pkey" PRIMARY KEY ("BillID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Bill"
    OWNER to postgres;



    CREATE TABLE IF NOT EXISTS public."Address"
(
    "AddressID" integer NOT NULL,
    "Block" integer,
    "Lot" integer,
    "Street" "char",
    "Barangay" "char",
    "City" "char",
    "Province" "char",
    "AccountID" integer NOT NULL,
    CONSTRAINT "Address_pkey" PRIMARY KEY ("AddressID"),
    CONSTRAINT "AccountID" FOREIGN KEY ("AccountID")
        REFERENCES public."HomeOwner" ("AccountID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Address"
    OWNER to postgres;