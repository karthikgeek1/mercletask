import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Applying the dark theme
Highcharts.setOptions({
  chart: {
    backgroundColor: "#1e1e1e",
  },
  title: {
    style: {
      color: "#ffffff",
    },
  },
  xAxis: {
    labels: {
      style: {
        color: "#ffffff",
      },
    },
  },
  yAxis: {
    gridLineColor: "transparent", 
    title: {
      text: "Message Count",
    },
    labels: {
      style: {
        color: "#ffffff",
      },
    },
  },
  tooltip: {
    formatter: function () {
      return (
        "<b>" +
        this.series.name +
        "</b><br/>" +
        "<br/>" +
        "<span style='color: #ffffff'>" + 
        this.y +
        " Messages on " +
        Highcharts.dateFormat("%e %b", this.x) +
        "</span>"
      );
    },
    backgroundColor: "#000000",
    crosshairs: {
      color: "white",
      dashStyle: "solid",
    },
    shared: true, 
  },
  plotOptions: {
    series: {
      lineColor: "aqua", 
      marker: {
        lineColor: "#333333",
      },
    },
  },
});


const EngagementHelper = {
  engagementMessageOverTimeChartOptions: (messageCountList, channels) => {
    // Grouping message counts by channelId
    const channelMessageCounts = {};
    messageCountList.forEach((messageCount) => {
      const { channelId, count, timeBucket } = messageCount;
      if (!channelMessageCounts[channelId]) {
        channelMessageCounts[channelId] = [];
      }
      channelMessageCounts[channelId].push({ count: parseInt(count), timeBucket });
    });

    // Filtering channels with messages on more than 1 date
    const filteredChannels = channels.filter((channel) => {
      const channelId = channel.value;
      return channelMessageCounts[channelId] && channelMessageCounts[channelId].length > 1;
    });

    // Preparing data for chart
    const seriesData = [];
    filteredChannels.forEach((channel) => {
      const channelId = channel.value;
      const channelName = channel.name;
      const data = channelMessageCounts[channelId].map((messageCount) => {
        return {
          x: new Date(messageCount.timeBucket).getTime(),
          y: messageCount.count,
        };
      });
      seriesData.push({ name: channelName, data });
    });

    // Sorting series data by channel name
    seriesData.sort((a, b) => a.name.localeCompare(b.name));

    // Configuring chart options
    const options = {
      chart: {
        type: "spline", 
        zoomType: "x",
      },
      title: {
        text: "Engagement: Messages Over Time",
      },
      xAxis: {
        type: "datetime",
        title: {
          text: "Dates",
        },
        labels: {
          format: "{value: %e %b}",
          style:{
            color:"#808080"
          }
        },
      },
      yAxis: {
        gridLineColor: "transparent",
        title: {
          text: "Message Count",
        },
        labels: {
          style: {
            color: "#808080",
          },
        },
      },
      tooltip: {
        formatter: function () {
          return (
            "<b>" +
            this.series.name +
            "</b><br/>" +
            "<br/>" +
            "<span style='color: #ffffff'>" + 
            this.y +
            " Messages on " +
            Highcharts.dateFormat("%e %b", this.x) +
            "</span>"
          );
        },
        backgroundColor: "#000000",
        crosshairs: {
          color: "white", 
          dashStyle: "solid", 
        },
        shared: true, 
      },
      series: seriesData,
    };

    return options;
  },
};

const EngagementMessagesOverTime = ({ messageCountList, channels }) => {
  const options = EngagementHelper.engagementMessageOverTimeChartOptions(
    messageCountList,
    channels
  );

  return <HighchartsReact highcharts={Highcharts} options={options}/>;
};

export default EngagementMessagesOverTime;
