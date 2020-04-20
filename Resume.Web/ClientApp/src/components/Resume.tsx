import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as ResumeStore from '../store/Resume';

type ResumeProps =
    ResumeStore.ResumeState &
    typeof ResumeStore.actionCreators &
    RouteComponentProps<{}>;

class Resume extends React.PureComponent<ResumeProps> {

    componentDidMount() {
        if (!this.props.experiences) { 
            this.props.getExperiences();
        }
        if (!this.props.education) {
            this.props.getEducation();
        }
    }

    public render() {
        let resumeMarkup = <></>;
      if (this.props.isLoading) {
        resumeMarkup =
          <div>
            <h3>Loading...</h3>
          </div>;
      } else if (!this.props.experiences || !this.props.education) {
        resumeMarkup = 
            <div>
                <h2>There was an error getting Luciano's work experiences.</h2>
            </div>;
      } else {
          let workExperiences = this.props.experiences.filter(exp => exp.type === 'Work');
          let internExperiences = this.props.experiences.filter(exp => exp.type === 'Intern');
          let education = this.props.education;
          resumeMarkup =
            <div className="resume">
                <div className="block-content">
                    <h1 className="header">Resume</h1>
                </div>
                <div className="block-content">
                    <div className="sub-title-color"></div>
                    <h1 className="sub-title">Work Experience</h1>
                    <div className="middle-line">
                        {
                            workExperiences.map((exp) => {
                                let expDates = exp.endDate ? exp.startDate + ' - ' + exp.endDate : exp.startDate;
                                return (
                                    <div className="two-columns">
                                        <div className="left-column">
                                          <p className="grey">{expDates}</p>
                                          <p>{exp.title} - {exp.company}</p>
                                        </div>
                                        <div className="right-column">
                                          <p>{exp.description}</p>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="block-content">
                    <div className="sub-title-color"></div>
                    <h1 className="sub-title">Internship Experience</h1>
                    <div className="middle-line">
                        {
                            internExperiences.map((exp) => {
                                return (
                                    <div className="two-columns">
                                        <div className="left-column">
                                          <p className="grey">{exp.startDate} - {exp.endDate}</p>
                                          <p>{exp.title} - {exp.company}</p>
                                        </div>
                                        <div className="right-column">
                                          <p>{exp.description}</p>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="block-content">
                    <div className="sub-title-color"></div>
                    <h1 className="sub-title">Education</h1>
                    <div className="middle-line">
                        {
                            education.map((edu) => {
                                return (
                                    <div className="two-columns">
                                        <div className="left-column">
                                          <p className="grey">{edu.startDate} - {edu.endDate}</p>
                                          <p>{edu.school}</p>
                                          <p>{edu.degreeType} - {edu.fieldOfStudy}</p>
                                        </div>
                                        <div className="right-column">
                                          <p>{edu.description}</p>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="block-content">
                    <div className="sub-title-color"></div>
                    <h1 className="sub-title">Skills</h1>
                    <div className="middle-line">
                        <div className="two-columns">
                            <div className="left-column">
                                <h4 className='grey'>Hard Skills</h4>
                                <p>Html</p>
                                <p>CSS</p>
                                <p>React</p>
                                <p>Redux</p>
                                <p>C#</p>
                                <p>.NET</p>
                                <p>SQL</p>
                                <p>Azure Dev/Ops</p>
                            </div>
                            <div className="right-column">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>;
      }
        return resumeMarkup;
    }
};

export default connect(
    (state: ApplicationState) => state.resume,
    ResumeStore.actionCreators
)(Resume as any);
