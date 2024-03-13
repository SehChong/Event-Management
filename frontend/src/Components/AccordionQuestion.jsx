import React from 'react';
import { Back } from '../Components/Back';
import { useLocation } from 'react-router-dom';

export const AccordionQuestion = () => {
    const { state } = useLocation();
    const eventDetails = state ? state.eventDetails : null;

    return (
        <div>
            <Back to="/attendance" />
            <div className="container mt-5">
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Question 1
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <div className="form-group">
                                    <label htmlFor="Textarea1" className='mb-3'>What knowledge/skills will you gain from attending the event?</label>
                                    <textarea id="Textarea1" className="form-control" rows="5" readOnly value={eventDetails?.question1}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Question 2
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <div className="form-group">
                                    <label htmlFor="Textarea2" className='mb-3'>How do you think you can apply the knowledge/skills learnt from the event to use in the future?</label>
                                    <textarea id="Textarea2" className="form-control" rows="5" readOnly value={eventDetails?.question2}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Question 3
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <div className="form-group">
                                    <label htmlFor="Textarea3" className='mb-3'>How do you feel about the event after attending it?</label>
                                    <textarea id="Textarea3" className="form-control" rows="5" readOnly value={eventDetails?.question3}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
