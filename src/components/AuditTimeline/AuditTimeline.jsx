
import AuditEvent from "../AuditEvent";

import "./AuditTimeline.css";

function AuditTimeline({ logs }) {

    const grupos = logs.reduce((acc, evento) => {

        const data = new Date(evento.data)
            .toLocaleDateString("pt-BR");

        if (!acc[data]) {
            acc[data] = [];
        }

        acc[data].push(evento);

        return acc;

    }, {});

    const datas = Object.keys(grupos);

    return (

        <div className="audit-timeline">

            {datas.map((data) => (

                <div
                    className="timeline-group"
                    key={data}
                >

                    <div className="timeline-date">

                        <span>{data}</span>

                        <small>
                            {grupos[data].length} evento(s)
                        </small>

                    </div>

                    {grupos[data].map((evento) => (

                        <AuditEvent
                            key={evento.id}
                            evento={evento}
                        />

                    ))}

                </div>

            ))}

        </div>

    );

}

export default AuditTimeline;

