# KPS (KoLiBer Project Standard)

> KPS have four stages of defenitions:

1. Software Development
2. Clean Code and Refactoring
3. Project Structure
4. Git and Versioning
5. Document Files

---

## Software Development

> KPS is a way to make software development even more clear.
> It defines six stages for software development :

1. Planning
2. Cycling
3. Designing
4. Building
5. Testing
6. Deploying

---

### Planning (Planning and Requirement Analytics)

At the first level we should do these items :

1. Determine the **purpose** of the project and doc them into **README.md**
2. Defining **TODO** List and doc them into **TODO.md**
3. Create **Backlog** at **VivifyScrum or etc** if SDLC was Agile using Scrum methodology.

---

### Cycling (Life Cycling - SDLC)

At the second level we should do these items :

1. Determine the type of **SDLC** and doc them into **README.md**
2. Create **Sprints, Epics** at **VivifyScrum or etc** if SDLC was Agile using Scrum methodology.

---

### Designing (Architecturing and Designing)

At the third level we should do these items :

1. Create **API** of endpoints and REST or gRPC or etc and API documentations (`editor.swagger.io` => `.yml`)
2. Create **ER** of database tables and relations
3. Determine the **layers and parts** of software (client -> ui, logic, db, net, ... --- server -> logic ( -> login, load balancer, ...), ...) using `TODO.md`
4. Determine the **architecture** of layers (Layered(Domain-Centric (Clean, ...), Database-Centric (MVC, MVP, MVVM, ...)), Client-Server, Master-Slave, Pipeline, Broker, ...)
5. Determine the **design** of layers and determining **classes**
6. Create **UML** of classes and scenarios
7. Create **Wireframe, Prototype** of **UI**

---

### Building (Coding using `Clean Code`)

At the fourth level we should do these items :

1. **Coding and Developing** the project layers (ui, core, db, net, ...) using **Clean Code** rules

---

### Testing (Unit Testing)

At the fifth level we should do these items :

1. Creating **Tests** for the project and test them

---

### Deploying

At the sixth level we should do these items :

1. Creating **release** build of the project and **launch** them
2. **UAT** and analysing user comments

---

## Clean Code and Refactoring

> Some basic and important tips for clean coding

### File and Folder

1. File names must be **simple**, **readable**, **consistent**
2. **SQL** commands with Capital characters
3. Consistant **Indention** (space and {} and ...)
4. After finishing every file **refactor** it (check comment, method size, variable naming, SQL, ...)
5. **DRY** principle (Don't Repeat Yourself)

### Naming (File, Folder, Class, Method, Variable, Temp, ID, ...)

1. Names must be **simple**
2. Names must be **readable**
3. Names must be **one word per meat**
4. Names **should'nt be abbrevation** (ksto -> koliber standard orm)
5. Name -> File, Class, Variable, Temp, ID
6. Verb -> Method
7. Fixed naming style (**CamelCase -> AddNumber**, **UnderScore -> add_number**)
8. Variable Naming:
    - Naming by **goal** and **simple**
9. Temps Naming:
    1. **i, j, k, t** -> loops
    2. **cursor** -> important loops
    3. **result** -> method return value
    4. **item** -> foreach or iterator
10. ID Naming:
    - **{base component}\_{view type}[\_{description 1}\_{description 2}\_{description 3}]**

### Classes

1. No GOD class (simple and small)
2. Every class has one goal
3. Every class is a black box (private every unnecessary methods and getter/setter for variables)
4. Every class is a module (no dependency - inteact with other classes using interfaces)
5. No Dead code -> if don't need now the code remove it !
6. For using DBMS, Net, etc create wrapper class (implement logic - them implement low level code (net, file, ...) using other class)

### Methods

1. Methods should be small
2. Methods should have one goal (do only one work)
3. Methods should be blackbox (get params, return result - without side effect !) (side effects using getter, setters (var, file, memory, net, db, ...))
4. Not nested control structures (if{if{...}} -> if{} if{} if{})
5. If control conditions gets bigger (if(a & !c | d & f)) use a method for that (if(cond()){...})
6. Methods should'nt return error codes, throw errors is better !
7. Grouping codes in every method and comment every group
8. DRY principle (don't copy methods - move them into super class)

### Commenting

1. Don't comment bad code, rewrite it !
2. Don't comment big if conditions, move it to new method !
3. Comment descriptions
4. Comment tips
5. Comment alerts
6. Comment XDoc
7. Comment method code groups
8. Other comments are noises !
9. XDoc:
    - File Description
    - Class Description
    - Constructor Description
    - Methods Description
10. XDoc Descriptions:

    ```text
        /**
        * your comments
        * your comments
        * your comments
        * @ xdoc command
        * @ xdoc command
        * @ xdoc command
        */
    ```

### Coding

1. Create File
2. Create Class
3. Create abstract Methods
4. XDoc File
5. Implement Methods
6. Refactor File
7. Goto Next File

### Modularity

> The most important thing in conding stage is relying on **modularity**, so break every project into submodules like **app** (starting main), **ui**, **core**, **db**, **net**, ...
>
> > So at the `Designing` stage of out software development we should design our architecture and **break into layers** (modules - ui, core, net, db, ...)

-   Every module has it's own dependencies (`lib`)
-   Every module has it's own target (UI, Core, DB, User Management, Analyze, Network, ....)
-   Every project has some modules and an `app` module that is the start point of project and create other modules and connects them together
-   Modularity using `modules` path and **multi subprojects** per project (configing CMake or Gradle or Rebar or NPM or etc)

---

## Git and Versioning

> For configuring git we have three level

### config

```bash
git init

git config user.name "{your name}"
git config user.email "{your email}"
git config core.editor code
git config core.autocrlf input
git config credential.helper store
git config http.proxy http://127.0.0.1:8118
git config https.proxy http://127.0.0.1:8118

git clone https://gitlab.com/ckoliber/KPS -b base
git clone https://gitlab.com/ckoliber/KPS -b {X}

// change dir struct

git remote add {remote name} [{.git url}]
git push --set-upstream {remote name} master --all
```

### MKdocs

> For configuring mkdocs we have three level

-   **installing**

    ```bash
    sudo apt install python-pip
    sudo pip install mkdocs mkdocs-material
    cd {project name}
    mkdocs new docs
    ```

### Git usage

> This level contains git using level in this level that is a loop until end of project we will use git in our project for version controlling

#### Stage, Commit (To local repository)

> At every quick editing or coding of our project we should save our changes or commit theme
>
> > For example every 10 min we should commit at least one stage to our local repository

#### Push (To remote repository)

> At every day editing after coding before release theme we should save our codes in a stable repository such as `gitlab.com` remote repository
>
> > For example every day we should push at least one commit to our remote repository

#### Pull (From remote repository)

> When ever we coding on two different system or need to rebase our codes from remote repository or etc, we should `pull` and `stage` and `commit` from and to remote and local repositories

#### Branching

> Managing branches is an important part of group working, creating standard branches and merging theme based on these rules

##### Branches names

###### master (master branch)

> In `master` branch we `tagging` the code
>
> > Bacause of global bug fixing we dont create a different branch such as `hotfix` for our bug fixing releases, so all of the releases are going into `master` branch with full clear tag

###### develop

> In `develop` branch we put our before release codes for final testing and analyzing and profiling if result was successful we merge `develop` branch into `master` and then tag it

###### develop\_{developer name}

> Every developer has it's own fork of code and can `rebase` it from master, after completing code `test`, `analyze` by self then will merge it into `develop` and from `develop` after final testing merge it into `master` and tag it, then if other developers needed the new release they can `rebase` them codes from `master`

#### Tagging

> Managing tags is an important part of releasing project, at the `release` branch we will tag our code versions based on these rules

##### X.Y.Z - Major.Minor.Patch

###### X (Major)

> Shows the big release number

###### Y (Minor)

> Shows the `futures` that added to this `X` version

###### Z (Patch)

> Shows the `bugs` that fixed from this `X` version

###### Example

-   **0.1.0** (start version)
-   **1.2.1**
-   **2.2.0**
-   **0.5.34**

---

## Document Files

### README.md

1. Project Name
2. Project Description
3. Project Owner
4. Project Author
5. Project Developers
6. Project Start date
7. Project Question
8. Project Goal
9. Project License
10. Project Languages and Frameworks
11. Project SDLC
12. Project links (vivifyscrum, gitlab, npm, etc)

### TODO.md

1. Todo Items
2. Todo Item Deadline
3. Todo Item Version

> At the `TODO.md` we will writing project futures and tagging them and deadlines
>
> > For writing todo's we can use these rules

1. **Contents**
    - **Example**
        1. **user** -> login, logout, state
        2. **map** -> search, set, get, analyze
        3. **search** -> site search
        4. **aboutus** -> about us
        5. **contactus** -> contact us
        6. **content** -> site content and posts
2. **Parts**
    - **Example**
        1. **indexpage**
            1. signin dialog
            2. signout dialog
            3. signup dialog
            4. aboutus dialog
            5. contactus dialog
            6. toolbar
            7. carousel
            8. futures
            9. description
            10. footer
            11. fab
        2. **mappage**
            1. signin dialog
            2. signout dialog
            3. signup dialog
            4. aboutus dialog
            5. contactus dialog
            6. toolbar
            7. map
            8. fab
        3. **adminpage**
            - ...
        4. **contentpage**
            - ...
        5. **detailpage**
            - ...
3. **Tagging**
    > We should tag our futures **until the next big release**
    - **Example**
        1. **indexpage** -> 0.1.Z
            1. signin dialog -> 0.1.Z
            2. signout dialog -> 0.1.Z
            3. signup dialog -> 0.1.Z
            4. aboutus dialog -> 0.1.Z
            5. contactus dialog -> 0.1.Z
            6. toolbar -> 0.1.Z
            7. carousel -> 0.1.Z
            8. futures -> 0.1.Z
            9. description -> 0.1.Z
            10. footer -> 0.1.Z
            11. fab -> 0.1.Z
        2. **mappage** -> 0.1.Z
            1. signin dialog -> 0.1.Z
            2. signout dialog -> 0.1.Z
            3. signup dialog -> 0.1.Z
            4. aboutus dialog -> 0.1.Z
            5. contactus dialog -> 0.1.Z
            6. toolbar -> 0.1.Z
            7. map -> 0.1.Z
            8. fab -> 0.1.Z
        3. **adminpage** -> 0.3.Z
            - ...
        4. **contentpage** -> 0.4.Z
            - ...
        5. **detailpage** -> 0.4.Z
            - ...
4. **Styling Views**
    > In this level we should design our `mockup` and create out `prototype` using `Adobe XD`.

### API

1. API documents (`http://editor.swagger.io` => `.yml` files)

### ER

1. Database ERD's

### UML

1. Class UML's (UseCase, Class, State, etc)
2. Module dependencies

### UI

1. UI Prototype
2. UI Wireframe (Adobe XD)

### Summary: (README.md -> TODO.md -> API -> ER -> UML -> UI -> Code -> Test)

1. **Init**: Git
2. **Plan**: README.md -> TODO.md -> Scrum(product backlog)
3. **Cycle**: README.md -> Scrum(release backlogs, sprints, epics)
4. **Design**: API/... -> ER/... -> UML/... -> UI/...
5. **Build**: Clean Code
6. **Test**: Unit Testing
7. **Deploy**: Comments in VivifyScrum (UAT)

### Tips

1. MVP launch
2. quick releases
3. `public`, `src`, `include`, `bin`, `build`, `test` sources folders

```code
--------|-|-|-|-|-|
```
