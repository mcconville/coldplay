### Coldplay

Uses Watson Personality Insights to analyze the lyrical changes of the the band Coldplay. Experiments with CSS Houdini for visualizing the data.

![Seven Ages of Chris Martin](sevenages.png)

#### Getting Started

This project plays with the CSS Houdini Paint API you can read more about it [here](https://developer.mozilla.org/en-US/docs/Web/Houdini).

The CSS Houdini specifications are only beginning to be adopted by web browsers. I tested my work with the latest versions of Chrome ( version 77 as I write this ).

#### Prerequisites

This project uses [Node JS](https://nodejs.org/en/download/) as a run time environment.

#### Installing

1. Assuming you have Node JS installed. Clone this repo, and cd into the folder you've cloned. You should see a file there called app.js. Type the following to install the Node dependencies:

```bash
npm install
```

1. Rename `ibm-credentials.env.sample` to `ibm-credentials.env`, and fill your Personality Insights API key.

```ini
PERSONALITY_INSIGHTS_IAM_APIKEY=<api-key>
```

#### Running

When the node dependencies have been installed, type the following to run the Node app:

```bash
npm start
```

You should see some output like this:

```bash
server starting on http://localhost:3000
```

#### Overview

TODO
