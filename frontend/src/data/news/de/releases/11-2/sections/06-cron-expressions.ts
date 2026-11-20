import type { NewsSectionTranslation } from "@/data/news/news";

const section: NewsSectionTranslation = {
  heading: `CRON-Ausdrücke`,
  content: [
    {
      type: `paragraph`,
      text: `Periodische Aufträge lassen sich jetzt mit CRON-Ausdrücken konfigurieren. CRON-Ausdrücke bieten vielfältige Konfigurationsmöglichkeiten – von minütlichen Ausführungen bis hin zu täglichen, wöchentlichen, monatlichen oder jährlichen.`,
    },
    {
      type: `list`,
      items: [
        {
          term: `Benutzersynchronisierung`,
          text: `Legen Sie den Ausführungszeitpunkt jetzt mit einem CRON-Ausdruck fest. So sind Synchronisierungen mehrmals täglich oder nur am Wochenende möglich.`,
        },
        {
          term: `Timer Bean`,
          text: `Legen Sie mit einem CRON-Ausdruck im neuen Start Event Bean <code>ch.ivyteam.ivy.process.eventstart.beans.TimerBean</code> fest, wann Ihre Prozesse gestartet werden.`,
        },
        {
          term: `Poller-API`,
          text: `Mit der neuen fluent <code>cpoll()</code>-API können Sie die Polling-Intervalle in Ihren Start- und Intermediate Event Beans viel einfacher definieren.`,
        },
        {
          term: `Überwachung`,
          text: `Überwachen Sie alle Aufträge und Ihre Start- und Intermediate Event Beans in den neuen Ansichten <a href="/doc/11.2/en/engine-guide/reference/engine-cockpit/monitor.html#jobs">Jobs</a>, <a href="/doc/11.2/en/engine-guide/reference/engine-cockpit/monitor.html#start-events">Start Events</a> und <a href="/doc/11.2/en/engine-guide/reference/engine-cockpit/monitor.html#intermediate-events">Intermediate Events</a> im Engine Cockpit.`,
        },
      ],
    },
  ],
  linkLabels: [
    `Enginehandbuch – Konfiguration`,
    `Enginehandbuch – Überwachung`,
    `Public API`,
  ],
};

export default section;
