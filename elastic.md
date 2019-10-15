# Kibana & Elasticsearch configuration 
This guide is designed to help you to configure elasticsearch and kibana to accept reports from the repo-analyzer tool.
If somehow you landed here without reading the previous article, feel free to read it here

I don’t know how familiar you are with the elastic stack, if you have never used it, don’t panic! It's pretty easy to setup and use.

**“Elasticsearch is a search engine based on the Lucene library. It provides a distributed, multitenant-capable full-text search engine with an HTTP web interface and schema-free JSON documents.”** - wikipedia.

In our application we will use elasticsearch to store and fetch the results from the repos we analyze. In order to visualize the data we collect, we will be using kibana! 

**“Kibana is an open source data visualization plugin for Elasticsearch. It provides visualization capabilities on top of the content indexed on an Elasticsearch cluster. Users can create bar, line and scatter plots, or pie charts and maps on top of large volumes of data.”** - wikipedia.

This is the are the kind of results we are going to achieve by the end of this article:


## Installation

### Elasticsearch 
If you have already an instance of elasticsearch on your computer, you may skip this part!

The installation is pretty straightforward. I am not going to cover it in detail in this article. However, I am going to provide the overall process.
I would recommend you to visit the official installation guide. It's the best way to be always up to date.

Independent on where you install your elasticsearch cluster, you have to follow 3 steps. The code I am to present works in ubuntu, if you are using a mac it’s very similar.

1. Download the elasticsearch executable for your system. In this case I am going to use ubuntu. 
    - curl -L -O https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.3.2-linux-x86_64.tar.gz
2. Extract the archive:
    - tar -xvf elasticsearch-7.3.2-linux-x86_64.tar.gz

3. Start Elasticsearch from the bin directory

```shell
cd elasticsearch-7.3.2/bin
./elasticsearch
```

Kibana is installed the same way as elasticsearch, you can find more details here


### Verify your install
After downloading and executing elasticsearch, you should be able to get a response from localhost:9200

```shell
curl localhost:9200
```

If you visit http://localhost:5601/ you should get the following screen: 

Now you are ready to get started with kibana!

## Import default visualizations and dashboards:

1. Before you start configuring kibana, you need to create the indexes and add some values to elastic. 

In order to to create the indexes based on each metric needs: 

``` shell
npm run analyze -- --elastic
```
If your elasticsearch instance is password protected you can pass through arguments as so:

```
npm run analyze -- --elastic --username=usr --password=pwd
```

After creating the indexes, you must add some data to elastic, you can do so by running the tool:

``` shell 
npm run analyze 
```

If your instance is protected you can always pass the username and password using the flags.


## Import the config
1. Go to **Management** > **Saved objects** > **Import**
2. Load this file into the website 
3. Disable the option **“Automatically overwrite all saved objects?”**
4. Press the button **Import the right bottom corner**

You should see something like this:

## Test
If you navigate into the Visualizations tab you can see that the configurations have been loaded successfully.

If you reached, congratulations! You have successfully imported our default configuration.
Continue reading the article here



 
