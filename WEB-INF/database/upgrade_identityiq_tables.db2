--
-- This script contains DDL statements to upgrade a database schema to
-- reflect changes to the model.  This file should only be used to
-- upgrade from the last formal release version to the current code base.
--

CONNECT TO iiq;

-- ManagedAttribute hash column
-- not adding unique yet, have to run upgrader first
-- could actually do this for all but SQL Server but handle them all the same way
alter table identityiq.spt_managed_attribute add hash varchar(128);

-- Add application to target
alter table identityiq.spt_target add application varchar(32);
alter table identityiq.spt_target add constraint FK19E5251939D71460 foreign key (application) references identityiq.spt_application;
create index identityiq.FK19E5251939D71460 on identityiq.spt_target (application);

-- Add refreshRule to schema
alter table identityiq.spt_application_schema add refresh_rule varchar(32);
alter table identityiq.spt_application_schema add constraint FK62F93AF8D9F8531C foreign key (refresh_rule) references identityiq.spt_rule;
create index identityiq.FK62F93AF8D9F8531C on identityiq.spt_application_schema (refresh_rule);

-- Add associationSchemaName to schema
alter table identityiq.spt_application_schema add association_schema_name varchar(255);

-- Add ObjectMapping to Schema Attributes
alter table identityiq.spt_schema_attributes add object_mapping varchar(255);

-- Add attributes to TargetAssociation
alter table identityiq.spt_target_association add attributes clob(17000000);

--
-- Task run lengths
--

alter table identityiq.spt_task_result add run_length integer default 0;
alter table identityiq.spt_task_result add run_length_average integer default 0;
alter table identityiq.spt_task_result add run_length_deviation integer default 0;

--
-- TaskItem host index
--

set integrity for identityiq.spt_task_result off;
alter table identityiq.spt_task_result add host_ci generated always as (upper(host));
set integrity for identityiq.spt_request,identityiq.spt_task_event,identityiq.spt_task_result,identityiq.spt_partition_result immediate checked force generated;
create index identityiq.spt_task_result_host on identityiq.spt_task_result (host_ci);

--
-- Maintenance Windows
--

alter table identityiq.spt_application add maintenance_expiration bigint default 0;

--
-- Target searching
--

alter table identityiq.spt_target drop column full_path_hash;
reorg table identityiq.spt_target;
alter table identityiq.spt_target add unique_name_hash varchar(128);
create index identityiq.spt_target_unique_name_hash on identityiq.spt_target (unique_name_hash);

-- IdentityRequest requester and target display names should have case insensitive indices
drop index identityiq.spt_idrequest_requestor;
set integrity for identityiq.spt_identity_request off;
alter table identityiq.spt_identity_request add requester_display_name_ci generated always as (upper(requester_display_name));
set integrity for identityiq.spt_identity_request,identityiq.spt_identity_request_item,identityiq.spt_identity_entitlement immediate checked force generated;
create index identityiq.spt_idrequest_requestor_ci on identityiq.spt_identity_request (requester_display_name_ci);

drop index identityiq.spt_idrequest_target;
set integrity for identityiq.spt_identity_request OFF;
alter table identityiq.spt_identity_request add target_display_name_ci generated always as (upper(target_display_name));
set integrity for identityiq.spt_identity_request,identityiq.spt_identity_request_item,identityiq.spt_identity_entitlement immediate checked force generated;
create index identityiq.spt_idrequest_target_ci on identityiq.spt_identity_request (target_display_name_ci);

-- Clean up Process tables
DROP TABLE identityiq.spt_process_application;
DROP TABLE identityiq.spt_process_bundles;
DROP TABLE identityiq.spt_process;

--
-- This is necessary to maintain the schema version. DO NOT REMOVE.
--
update identityiq.spt_database_version set schema_version = '7.2-42' where name = 'main';
