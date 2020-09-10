# FormSpace API REST API Documentation

- [FormSpace API REST API Documentation](#formspace-api-rest-api-documentation)
  * [Host](#host)
  * [Headers](#headers)
- [Models](#models)
  * [Organization](#organization)
    + [organization model](#organization-model)
  * [Session](#session)
    + [session model](#session-model)
  * [User](#user)
    + [User model](#user-model)
      - [User parent models](#user-parent-models)
      - [User child models](#user-child-models)
  * [Profile](#profile)
    + [Profile model](#profile-model)
      - [Profile child models](#profile-child-models)
  * [Form](#form)
    + [Form model](#form-model)
      - [Form parent models](#form-parent-models)
      - [Form child models](#form-child-models)
  * [Folder](#folder)
    + [Folder model](#folder-model)
      - [Folder parent models](#folder-parent-models)
      - [Folder child models](#folder-child-models)
  * [FolderShare](#folder_share)
    + [FolderShare model](#folder_share-model)
      - [FolderShare parent models](#folder_share-parent-models)
  * [FormShare](#form_share)
    + [FormShare model](#form_share-model)
      - [FormShare parent models](#form_share-parent-models)
  * [FormLog](#form_log)
    + [FormLog model](#form_log-model)
      - [FormLog parent models](#form_log-parent-models)
  * [FolderLog](#folder_log)
    + [FolderLog model](#folder_log-model)
      - [FolderLog parent models](#folder_log-parent-models)
  * [Hook](#hook)
    + [Hook model](#hook-model)
      - [Hook parent models](#hook-parent-models)
  * [FormTag](#form_tag)
    + [FormTag model](#form_tag-model)
      - [FormTag child models](#form_tag-child-models)
  * [FormFormTag](#form_form_tag)
    + [FormFormTag model](#form_form_tag-model)
      - [FormFormTag parent models](#form_form_tag-parent-models)
  * [Record](#record)
    + [Record model](#record-model)
      - [Record parent models](#record-parent-models)
  * [Assignation](#assignation)
    + [Assignation model](#assignation-model)
      - [Assignation parent models](#assignation-parent-models)
  * [PivotState](#pivot_state)
    + [PivotState model](#pivot_state-model)
      - [PivotState parent models](#pivot_state-parent-models)
- [Predefined values](#predefined-values)
  * [HookType enum](#hooktype-enum)
  * [FormLogAction enum](#formlogaction-enum)
  * [UserType enum](#usertype-enum)
  * [FolderLogAction enum](#folderlogaction-enum)
  * [HTTPMethod enum](#httpmethod-enum)
- [Queries](#queries)
  * [Query string parameters](#query-string-parameters)
    + [Sorting](#prisma-sorting)
    + [Filtering](#prisma-filtering)
    + [selecting](#prisma-selecting)

## Host
> https://formspace-api.vercel.app

## Headers
Header | Value | Description
------------ | ------------- | -------------
Authorization | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25JZCI6MiwibmFtZSI6IkdhbGVubyJ9.M7aiCB-TY9-BzPkk0zN5jsXJMHbbqoXT-zjehyOtMuw |  JWT generated through this APIs authentication endpoint
Content-Type | application/json | Requests body must be JSON

# Models

## Organization
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/organization | Find many profile | Organization | N/A
GET | /api/organization/:id | Find one profile | [[Organization](#organization-model)] | N/A
GET | /api/organization/:id | Find one profile | [[Organization](#organization-model)] | N/A
POST | /api/organization | Create organization | Organization | [Organization](#organization-model) or [[Organization](#organization-model)]
PUT | /api/organization/:id | Edit organization | Organization | [Organization](#organization-model) or [Organization](#organization-model) or [[Organization](#organization-model)]
DELETE | /api/organization/:id | Delete organization | Organization | [Organization](#organization-model)

### organization model
```
model Organization {
  id    String    @default(uuid()) @id
  createdAt DateTime    @default(now()) 
  title String
  description String?
  logo String?
  user User[]
}
```

## Session
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/session | Find many profile | Session | N/A
GET | /api/session/:id | Find one profile | [[Session](#session-model)] | N/A
POST | /api/session | Create session | Session | [Session](#session-model) or [[Session](#session-model)]
PUT | /api/session/:id | Edit session | Session | [Session](#session-model) or [Session](#session-model) or [[Session](#session-model)]
DELETE | /api/session/:id | Delete session | Session | [Session](#session-model)

### session model
```
model Session {
  access_token          String
  createdAt             DateTime @default(now())
  device                String?
  device_info           String?
  id                    String   @id @default(uuid())
  id_token              String
  ip                    String?
  isAlive               Boolean
  refresh_token         String
  refresh_token_expires String?
  userId                String
  user                  User     @relation(fields: [userId], references: [id])
}
```

## User
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/user | Find many user | User | N/A
GET | /api/userCount | Count user | [[User](#user-model)] | N/A
GET | /api/user/:id | Find one user | [[User](#user-model)] | N/A
GET | /api/profile/:id/user | Find user through its parent profile | [[User](#user-model)] | N/A
GET | /api/organization/:id/user | Find user through its parent organization | [[User](#user-model)] | N/A
POST | /api/user | Create user | User | [User](#user-model) or [[User](#user-model)]
PUT | /api/user/:id | Update user | User | [User](#user-model) or [[User](#user-model)]
DELETE | /api/user/:id | Delete user | User | [User](#user-model)

### user model
```
model User {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    authId String?   
    email String  @unique 
    name String   
    picture String?   
    type UserType   
    profileId String?
    profile  Profile?  @relation(fields: [profileId], references: [id])
    organizationId String?
    organization  Organization?  @relation(fields: [organizationId], references: [id])
    form Form[]
    session Session[]
    folder_share FolderShare[]
    form_share FormShare[]
    record Record[]
    assignation Assignation[]
}
```

#### user parent models

Models on which User depends on

- [Profile](#profile-model)
- [Organization](#organization-model)

#### user child models

Models that depend on User

- [Form](#form-model)
- [Session](#session-model)
- [FolderShare](#folder_share-model)
- [FormShare](#form_share-model)
- [Record](#record-model)
- [Assignation](#assignation-model)


## Profile
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/profile | Find many profile | Profile | N/A
GET | /api/profileCount | Count profile | [[Profile](#profile-model)] | N/A
GET | /api/profile/:id | Find one profile | [[Profile](#profile-model)] | N/A
POST | /api/profile | Create profile | Profile | [Profile](#profile-model) or [[Profile](#profile-model)]
PUT | /api/profile/:id | Update profile | Profile | [Profile](#profile-model) or [[Profile](#profile-model)]
DELETE | /api/profile/:id | Delete profile | Profile | [Profile](#profile-model)

### profile model
```
model Profile {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    name String   
    profile Json   
    user User[]
}
```


#### profile child models

Models that depend on Profile

- [User](#user-model)


## Form
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/form | Find many form | Form | N/A
GET | /api/formCount | Count form | [[Form](#form-model)] | N/A
GET | /api/form/:id | Find one form | [[Form](#form-model)] | N/A
GET | /api/user/:id/form | Find form through its parent user | [[Form](#form-model)] | N/A
GET | /api/folder/:id/form | Find form through its parent folder | [[Form](#form-model)] | N/A
GET | /api/template/:id/form | Find form through its parent template | [[Form](#form-model)] | N/A
GET | /api/versionOf/:id/form | Find form through its parent versionOf | [[Form](#form-model)] | N/A
POST | /api/form | Create form | Form | [Form](#form-model) or [[Form](#form-model)]
PUT | /api/form/:id | Update form | Form | [Form](#form-model) or [[Form](#form-model)]
DELETE | /api/form/:id | Delete form | Form | [Form](#form-model)

### form model
```
model Form {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    deletedAt DateTime?
    isArchived Boolean @default(false)
    title String   
    description String?   
    structure Json?   
    isEnabled Boolean    @default(true) 
    startDate DateTime   
    endDate DateTime   
    isPublished Boolean    @default(false) 
    userId String?
    user  User?  @relation(fields: [userId], references: [id])
    folderId String?
    folder  Folder?  @relation(fields: [folderId], references: [id])
    templateId String?
    template  Form?  @relation("template", fields: [templateId], references: [id])
    versionOfId String?
    versionOf  Form?  @relation("versionOf", fields: [versionOfId], references: [id])
    versions Form[] @relation("versionOf")
    templates Form[] @relation("template")
    form_share FormShare[]
    form_form_tag FormFormTag[]
    record Record[]
    assignation Assignation[]
    pivot_state PivotState[]
}
```

#### form parent models

Models on which Form depends on

- [User](#user-model)
- [Folder](#folder-model)
- [Form](#template-model)
- [Form](#versionOf-model)

#### form child models

Models that depend on Form

- [Form](#versionOf-model)
- [Form](#template-model)
- [FormShare](#form_share-model)
- [FormFormTag](#form_form_tag-model)
- [Record](#record-model)
- [Assignation](#assignation-model)
- [PivotState](#pivot_state-model)


## Folder
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/folder | Find many folder | Folder | N/A
GET | /api/folderCount | Count folder | [[Folder](#folder-model)] | N/A
GET | /api/folder/:id | Find one folder | [[Folder](#folder-model)] | N/A
GET | /api/folder/:id/folder | Find folder through its parent folder | [[Folder](#folder-model)] | N/A
GET | /api/user/:id/folder | Find folder through its parent user | [[Folder](#folder-model)] | N/A
POST | /api/folder | Create folder | Folder | [Folder](#folder-model) or [[Folder](#folder-model)]
PUT | /api/folder/:id | Update folder | Folder | [Folder](#folder-model) or [[Folder](#folder-model)]
DELETE | /api/folder/:id | Delete folder | Folder | [Folder](#folder-model)

### folder model
```
model Folder {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    title String   
    isArchived Boolean   
    folderId String?
    folder  Folder?  @relation(fields: [folderId], references: [id])
    userId String?
    user  User?  @relation(fields: [userId], references: [id])
    form Form[]
    folder_share FolderShare[]
}
```

#### folder parent models

Models on which Folder depends on

- [Folder](#folder-model)
- [User](#user-model)

#### folder child models

Models that depend on Folder

- [Form](#form-model)
- [FolderShare](#folder_share-model)


## FolderShare
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/folder_share | Find many folder_share | FolderShare | N/A
GET | /api/folder_shareCount | Count folder_share | [[FolderShare](#folder_share-model)] | N/A
GET | /api/folder_share/:id | Find one folder_share | [[FolderShare](#folder_share-model)] | N/A
GET | /api/folder/:id/folder_share | Find folder_share through its parent folder | [[FolderShare](#folder_share-model)] | N/A
GET | /api/user/:id/folder_share | Find folder_share through its parent user | [[FolderShare](#folder_share-model)] | N/A
POST | /api/folder_share | Create folder_share | FolderShare | [FolderShare](#folder_share-model) or [[FolderShare](#folder_share-model)]
PUT | /api/folder_share/:id | Update folder_share | FolderShare | [FolderShare](#folder_share-model) or [[FolderShare](#folder_share-model)]
DELETE | /api/folder_share/:id | Delete folder_share | FolderShare | [FolderShare](#folder_share-model)

### folder_share model
```
model FolderShare {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    folderId String
    folder  Folder  @relation(fields: [folderId], references: [id])
    userId String
    user  User  @relation(fields: [userId], references: [id])
}
```

#### folder_share parent models

Models on which FolderShare depends on

- [Folder](#folder-model)
- [User](#user-model)


## FormShare
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/form_share | Find many form_share | FormShare | N/A
GET | /api/form_shareCount | Count form_share | [[FormShare](#form_share-model)] | N/A
GET | /api/form_share/:id | Find one form_share | [[FormShare](#form_share-model)] | N/A
GET | /api/form/:id/form_share | Find form_share through its parent form | [[FormShare](#form_share-model)] | N/A
GET | /api/user/:id/form_share | Find form_share through its parent user | [[FormShare](#form_share-model)] | N/A
POST | /api/form_share | Create form_share | FormShare | [FormShare](#form_share-model) or [[FormShare](#form_share-model)]
PUT | /api/form_share/:id | Update form_share | FormShare | [FormShare](#form_share-model) or [[FormShare](#form_share-model)]
DELETE | /api/form_share/:id | Delete form_share | FormShare | [FormShare](#form_share-model)

### form_share model
```
model FormShare {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    formId String
    form  Form  @relation(fields: [formId], references: [id])
    userId String
    user  User  @relation(fields: [userId], references: [id])
}
```

#### form_share parent models

Models on which FormShare depends on

- [Form](#form-model)
- [User](#user-model)


## FormLog
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/form_log | Find many form_log | FormLog | N/A
GET | /api/form_logCount | Count form_log | [[FormLog](#form_log-model)] | N/A
GET | /api/form_log/:id | Find one form_log | [[FormLog](#form_log-model)] | N/A
GET | /api/form/:id/form_log | Find form_log through its parent form | [[FormLog](#form_log-model)] | N/A
GET | /api/user/:id/form_log | Find form_log through its parent user | [[FormLog](#form_log-model)] | N/A
POST | /api/form_log | Create form_log | FormLog | [FormLog](#form_log-model) or [[FormLog](#form_log-model)]
PUT | /api/form_log/:id | Update form_log | FormLog | [FormLog](#form_log-model) or [[FormLog](#form_log-model)]
DELETE | /api/form_log/:id | Delete form_log | FormLog | [FormLog](#form_log-model)

### form_log model
```
model FormLog {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    action FormLogAction   
    record Json   
    formId String
    form  Form  @relation(fields: [formId], references: [id])
    userId String
    user  User  @relation(fields: [userId], references: [id])
}
```

#### form_log parent models

Models on which FormLog depends on

- [Form](#form-model)
- [User](#user-model)


## FolderLog
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/folder_log | Find many folder_log | FolderLog | N/A
GET | /api/folder_logCount | Count folder_log | [[FolderLog](#folder_log-model)] | N/A
GET | /api/folder_log/:id | Find one folder_log | [[FolderLog](#folder_log-model)] | N/A
GET | /api/folder/:id/folder_log | Find folder_log through its parent folder | [[FolderLog](#folder_log-model)] | N/A
GET | /api/user/:id/folder_log | Find folder_log through its parent user | [[FolderLog](#folder_log-model)] | N/A
POST | /api/folder_log | Create folder_log | FolderLog | [FolderLog](#folder_log-model) or [[FolderLog](#folder_log-model)]
PUT | /api/folder_log/:id | Update folder_log | FolderLog | [FolderLog](#folder_log-model) or [[FolderLog](#folder_log-model)]
DELETE | /api/folder_log/:id | Delete folder_log | FolderLog | [FolderLog](#folder_log-model)

### folder_log model
```
model FolderLog {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    action FolderLogAction   
    record Json   
    folderId String
    folder  Folder  @relation(fields: [folderId], references: [id])
    userId String
    user  User  @relation(fields: [userId], references: [id])
}
```

#### folder_log parent models

Models on which FolderLog depends on

- [Folder](#folder-model)
- [User](#user-model)


## Hook
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/hook | Find many hook | Hook | N/A
GET | /api/hookCount | Count hook | [[Hook](#hook-model)] | N/A
GET | /api/hook/:id | Find one hook | [[Hook](#hook-model)] | N/A
GET | /api/form/:id/hook | Find hook through its parent form | [[Hook](#hook-model)] | N/A
POST | /api/hook | Create hook | Hook | [Hook](#hook-model) or [[Hook](#hook-model)]
PUT | /api/hook/:id | Update hook | Hook | [Hook](#hook-model) or [[Hook](#hook-model)]
DELETE | /api/hook/:id | Delete hook | Hook | [Hook](#hook-model)

### hook model
```
model Hook {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    endpoint String   
    method HTTPMethod   
    type HookType   
    headers Json   
    template Json?   
    body Json?   
    params Json?   
    title String   
    formId String
    form  Form  @relation(fields: [formId], references: [id])
}
```

#### hook parent models

Models on which Hook depends on

- [Form](#form-model)


## FormTag
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/form_tag | Find many form_tag | FormTag | N/A
GET | /api/form_tagCount | Count form_tag | [[FormTag](#form_tag-model)] | N/A
GET | /api/form_tag/:id | Find one form_tag | [[FormTag](#form_tag-model)] | N/A
POST | /api/form_tag | Create form_tag | FormTag | [FormTag](#form_tag-model) or [[FormTag](#form_tag-model)]
PUT | /api/form_tag/:id | Update form_tag | FormTag | [FormTag](#form_tag-model) or [[FormTag](#form_tag-model)]
DELETE | /api/form_tag/:id | Delete form_tag | FormTag | [FormTag](#form_tag-model)

### form_tag model
```
model FormTag {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    title String   
    description String   
    form_form_tag FormFormTag[]
}
```


#### form_tag child models

Models that depend on FormTag

- [FormFormTag](#form_form_tag-model)


## FormFormTag
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/form_form_tag | Find many form_form_tag | FormFormTag | N/A
GET | /api/form_form_tagCount | Count form_form_tag | [[FormFormTag](#form_form_tag-model)] | N/A
GET | /api/form_form_tag/:id | Find one form_form_tag | [[FormFormTag](#form_form_tag-model)] | N/A
GET | /api/form/:id/form_form_tag | Find form_form_tag through its parent form | [[FormFormTag](#form_form_tag-model)] | N/A
GET | /api/form_tag/:id/form_form_tag | Find form_form_tag through its parent form_tag | [[FormFormTag](#form_form_tag-model)] | N/A
POST | /api/form_form_tag | Create form_form_tag | FormFormTag | [FormFormTag](#form_form_tag-model) or [[FormFormTag](#form_form_tag-model)]
PUT | /api/form_form_tag/:id | Update form_form_tag | FormFormTag | [FormFormTag](#form_form_tag-model) or [[FormFormTag](#form_form_tag-model)]
DELETE | /api/form_form_tag/:id | Delete form_form_tag | FormFormTag | [FormFormTag](#form_form_tag-model)

### form_form_tag model
```
model FormFormTag {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    formId String
    form  Form  @relation(fields: [formId], references: [id])
    form_tagId String
    form_tag  FormTag  @relation(fields: [form_tagId], references: [id])
}
```

#### form_form_tag parent models

Models on which FormFormTag depends on

- [Form](#form-model)
- [FormTag](#form_tag-model)


## Record
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/record | Find many record | Record | N/A
GET | /api/recordCount | Count record | [[Record](#record-model)] | N/A
GET | /api/record/:id | Find one record | [[Record](#record-model)] | N/A
GET | /api/form/:id/record | Find record through its parent form | [[Record](#record-model)] | N/A
GET | /api/user/:id/record | Find record through its parent user | [[Record](#record-model)] | N/A
POST | /api/record | Create record | Record | [Record](#record-model) or [[Record](#record-model)]
PUT | /api/record/:id | Update record | Record | [Record](#record-model) or [[Record](#record-model)]
DELETE | /api/record/:id | Delete record | Record | [Record](#record-model)

### record model
```
model Record {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    record Json   
    isDraft Boolean   
    recordedAt DateTime   
    location Json   
    formId String
    form  Form  @relation(fields: [formId], references: [id])
    userId String
    user  User  @relation(fields: [userId], references: [id])
}
```

#### record parent models

Models on which Record depends on

- [Form](#form-model)
- [User](#user-model)


## Assignation
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/assignation | Find many assignation | Assignation | N/A
GET | /api/assignationCount | Count assignation | [[Assignation](#assignation-model)] | N/A
GET | /api/assignation/:id | Find one assignation | [[Assignation](#assignation-model)] | N/A
GET | /api/form/:id/assignation | Find assignation through its parent form | [[Assignation](#assignation-model)] | N/A
GET | /api/user/:id/assignation | Find assignation through its parent user | [[Assignation](#assignation-model)] | N/A
POST | /api/assignation | Create assignation | Assignation | [Assignation](#assignation-model) or [[Assignation](#assignation-model)]
PUT | /api/assignation/:id | Update assignation | Assignation | [Assignation](#assignation-model) or [[Assignation](#assignation-model)]
DELETE | /api/assignation/:id | Delete assignation | Assignation | [Assignation](#assignation-model)

### assignation model
```
model Assignation {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    formId String
    form  Form  @relation(fields: [formId], references: [id])
    userId String
    user  User  @relation(fields: [userId], references: [id])
}
```

#### assignation parent models

Models on which Assignation depends on

- [Form](#form-model)
- [User](#user-model)


## PivotState
HTTP Method | URL | Description | Response | Body
------------ | ------------- | ------------- | ------------- | -------------
GET | /api/pivot_state | Find many pivot_state | PivotState | N/A
GET | /api/pivot_stateCount | Count pivot_state | [[PivotState](#pivot_state-model)] | N/A
GET | /api/pivot_state/:id | Find one pivot_state | [[PivotState](#pivot_state-model)] | N/A
GET | /api/form/:id/pivot_state | Find pivot_state through its parent form | [[PivotState](#pivot_state-model)] | N/A
POST | /api/pivot_state | Create pivot_state | PivotState | [PivotState](#pivot_state-model) or [[PivotState](#pivot_state-model)]
PUT | /api/pivot_state/:id | Update pivot_state | PivotState | [PivotState](#pivot_state-model) or [[PivotState](#pivot_state-model)]
DELETE | /api/pivot_state/:id | Delete pivot_state | PivotState | [PivotState](#pivot_state-model)

### pivot_state model
```
model PivotState {
    id    String    @default(uuid()) @id
    createdAt DateTime    @default(now()) 
    title String   
    description String?   
    state Json   
    formId String
    form  Form  @relation(fields: [formId], references: [id])
}
```

#### pivot_state parent models

Models on which PivotState depends on

- [Form](#form-model)



# Predefined values


## HookType enum

- WRITE
- READ

## FormLogAction enum

- OPEN
- FILL
- DELETE
- UPDATE
- CREATE

## UserType enum

- OPERATIVO
- ADMIN
- SUPERVISOR

## FolderLogAction enum

- OPEN
- DELETE
- UPDATE
- CREATE

## HTTPMethod enum

- POST
- PUT
- DELETE
- GET
- PATCH
- COPY
- HEAD
- OPTIONS
- LINK
- UNLINK
- PURGE
- LOCK
- UNLOCK
- PROPFIND
- VIEW

# Queries

This API implements [qs](https://github.com/ljharb/qs) on a middleware to parse query string parameters.  You can use [qs.Stringify](https://github.com/ljharb/qs#stringifying) on your frontend to encode your queries as strings (already implemented in API Client).  Since this project implements [Prisma.io](https://prisma.io) as client to access DB, please refer to the following docs:

## Prisma sorting

- [Prisma sorting reference](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/sorting)

## Prisma filtering

- [Prisma filtering reference](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/filtering)

## Prisma selecting

- [Prisma selecting reference](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/field-selection)