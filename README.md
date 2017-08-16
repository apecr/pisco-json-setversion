## Main Index:

- [Available Commands](#available-commands)
  - [Flows](#flows)
  - [Steps](#steps)
    - [cordova-plugin::setVersion (Write version on project json file)](#setversion-write-version-on-project-json-file)
- [Plugins](#plugins)


## Available Commands:

### STEPS

#### cordova-plugin::setVersion (Write version on project json file)
[[Index]](#main-index)

## Description

Write version on json files in this.params.jsonFiles (bower.json, package.json,...) according GitFlow terms.

## Parameters

- **--jsonFiles**: [Array], default: [&#39;bower.json&#39;, &#39;package.json&#39;] : Sets json files to search in order to be changed
- **--versionDescription**: [String], default: &#39;chore(): change version file:&#39; : Commentary displayed on commit when files change.
- **--versionStrategies**: [Object], default: see version strategies section

## Version Strategies

This parameter configure all the behaviour of this step.

Default:

```
  "versionStrategies": {
    "finish" : {
      "feature": ["prerelease", "beta"],
      "merger": ["prerelease", "beta"],
      "release": ["auto", ""],
      "hotfix": ["remove", "hotfix"]
    },
    "start" : {
      "feature": ["prerelease", "alpha"],
      "merger": ["prerelease", "aam"],
      "release": ["prerelease", "rc"],
      "hotfix": ["#prehotfix", "hotfix"]
    }
  }
```

### Flow name: (First level object)

Default are "finish" or "start". Is the name of the flow that the step is included. If this step is included inside other flows nothing is going to happen and the step will ends ok

### Branch name: (Second level object)

Default are "feature", "merger", "release", "hotfix". The name of the branch where the step is executed. If the branch is different of any configured one nothing happen and the step will ends ok

### Version Strategy: (Third level object an Array)

Default in the first occurrence is ["prerelease", "beta"].

1) First element in array is the strategy that is going to be apply when the step in the flow/branch is executed. If the strategy is not valid and error will be thrown.
2) Second element in array is the prereleaseTag to be append at the end of the version. (f.i. -beta, -alpha, ...)

#### Semver strategies

All strategies of inc function of this module: https://www.npmjs.com/package/semver

(major, premajor, minor, preminor, patch, prepatch, or prerelease)

#### Custom Strategies (begins with #)

Execute a function inside this step, at the moment there is only one custom strategy:

*prehotfix:* Like prerelease but never change patch/minor/major

#### "auto" Strategy

Search for the last tag and calculate strategy between the actual version.

#### "remove" Strategy

Only remove prereleaseTag

## PLUGINS

