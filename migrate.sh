#!/bin/bash

# Run cleanup first
psql -f cleanup.sql

# Run schema and data in order
psql -f 1_schema.sql
psql -f 2_policies.sql
psql -f 3_data.sql
psql -f 3_1_more_tools.sql
psql -f 3_2_enterprise_tools.sql
psql -f 3_3_specialized_tools.sql
psql -f 3_4_test_users.sql
psql -f 3_5_industry_tools_and_reviews.sql
psql -f 4_indexes.sql 