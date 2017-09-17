## 1.1.7 (Sep 17, 2017)
- **Feature:**
  - Add find companies method
([@drodrigo](https://github.com/thiagommedeiros) in [#44](https://github.com/thiagommedeiros/bus-promise/pull/44))

## 1.1.6 (Sep 16, 2017)
- **Feature:**
  - Add find line by direction
([@drodrigo](https://github.com/thiagommedeiros) in [#42](https://github.com/thiagommedeiros/bus-promise/pull/42))

## 1.1.5 (Jul 23, 2017)
- **Feature:**
  - Add find by all stops
  - update response params when finding by all lines
([@thiagommedeiros](https://github.com/thiagommedeiros) in [#40](https://github.com/thiagommedeiros/bus-promise/pull/40))

## 1.1.4 (Jul 22, 2017)
- **Refactor and Bug-fix:**
  - Refactoring tests to get better assertions
  - Fix sptrans arrival forecast route
  - Fix params that sptrans has changed
([@thiagommedeiros](https://github.com/thiagommedeiros) in [#39](https://github.com/thiagommedeiros/bus-promise/pull/39))

## 1.1.3 (Jul 21, 2017)
- **Bug-fix:**
  - Fix async error on lines response
  - Fix stops response params
  - Fix vehicles position response params
([@thiagommedeiros](https://github.com/thiagommedeiros) in [#38](https://github.com/thiagommedeiros/bus-promise/pull/38))

## 1.1.2 (Jul 15, 2017)
- **Find:** Update find method to send the `type` param to `bus-server`.
([@thiagommedeiros](https://github.com/thiagommedeiros) in [#37](https://github.com/thiagommedeiros/bus-promise/pull/37))

## 1.1.1 (Jul 15, 2017)
- **Build:** Add a plugin to replace process.env.NODE_ENV with "production" because it crashes on browser.
([@thiagommedeiros](https://github.com/thiagommedeiros) in [#36](https://github.com/thiagommedeiros/bus-promise/pull/36))

## 1.1.0 (Jul 15, 2017)
- **Build:** Browser build changed to use `rollup` instead of `browserify`.
- **ES6 Modules:** Update code to follow the ES6 modules final syntax
([@thiamsantos](https://github.com/thiamsantos) in [#34](https://github.com/thiagommedeiros/bus-promise/pull/34))

## 1.0.9 (Jul 02, 2017)
- **Version:** The SPTrans api version was changed from `v1` to `v2.1`
- **Language:** The `bus-promise` parameters and responses was changed from `portuguese` to `english`
([@thiagommedeiros](https://github.com/thiagommedeiros) in [#26](https://github.com/thiagommedeiros/bus-promise/pull/26))

## 1.0.8 (Jun 27, 2017)
- **Rename:** The library name was changed from `sptrans-promise` to `bus-promise` ([@thiagommedeiros](https://github.com/thiagommedeiros) in [#25](https://github.com/thiagommedeiros/bus-promise/pull/25))

## 1.0.7 (May 12, 2017)
- **Bug-fix:** Fixed the bug when a `linha` haven't a `shape_id` ([@thiagommedeiros](https://github.com/thiagommedeiros) in [#19](https://github.com/thiagommedeiros/bus-promise/pull/19))

## 1.0.6 (May 04, 2017)
- **Feature:** Added a search by all `linhas`. ([@thiagommedeiros](https://github.com/thiagommedeiros) in [#18](https://github.com/thiagommedeiros/bus-promise/pull/18))
