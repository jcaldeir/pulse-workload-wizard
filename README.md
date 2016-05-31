# pulse-workload-wizard
TrueSight Pulse Plugin to dynamically generate metrics and data streams for demo purposes

#### Supported OS

|     OS    | Linux | Windows | SmartOS | OS X |
|:----------|:-----:|:-------:|:-------:|:----:|
| Supported |   v   |    v    |    -    |  -   |

#### Boundary Meter versions v4.2 or later

- To install new meter go to Settings->Installation or [see instructions](https://help.boundary.com/hc/en-us/sections/200634331-Installation).
- To upgrade the meter to the latest version - [see instructions](https://help.boundary.com/hc/en-us/articles/201573102-Upgrading-the-Boundary-Meter).

#### Boundary Meter versions earlier than v4.2

None

#### Server Runtime

|  Runtime | node.js | Python | Java |
|:---------|:-------:|:------:|:----:|
| Required |    +    |        |      |

- [How to install node.js?](https://help.boundary.com/hc/articles/202360701)

### Plugin Setup

None

### Plugin Configuration Fields

|Field Name   |Description                                             |
|:----------------|:---------------------------------------------------|
|Source           |Meter collecting metrics from the Streaming Platform|
|PollInterval     |How often to send measurements in seconds           |
|MetricsHost      |URL containing the metrics metadata                 |


### Metrics Collected

|Metric Name                       |Description                                          |
|:---------------------------------|:----------------------------------------------------|
|WIZARD_TOTAL_METRICS              |Total number of metrics generated                    |
|WIZARD_TOTAL_MEASUREMENTS         |Total number of measurements pushed                  |

### References

None
