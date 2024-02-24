import React from 'react'
import { Back } from '../Components/Back'
import { Button } from 'react-bootstrap'

export const AccordionForm = () => {
  return (
    <div>
        <Back to="/attendance"/>
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
                    <form className='p-3'>
                        <div class="form-group">
                            <label for="textlabelQ1" className='mb-3'>What knowledge/skills will you gain from attending the event?</label>
                            <textarea class="form-control" id="Textarea1" rows="5"></textarea>
                        </div>
                    </form>
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
                    <form className='p-3'> 
                        <div class="form-group">
                            <label for="textlabelQ2" className='mb-3'>How do you think you can apply the knowledge/skills learnt from the event to use in the future?</label>
                            <textarea class="form-control" id="Textarea2" rows="5"></textarea>
                        </div>
                    </form>
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
                    <form className='p-3'>
                        <div class="form-group">
                            <label for="textlabelQ3" className='mb-3'>How do you feel about the event after attending it?</label>
                            <textarea class="form-control" id="Textarea3" rows="5"></textarea>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </div>
        <div className='d-flex justify-content-end'>
            <Button variant="primary" className='my-5'>Submit</Button>
        </div>
        </div>
    </div>
  )
}
