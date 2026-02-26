"use client"

import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"

import FieldsetAccent from './form/FieldsetAccent'
import FieldsetCanceledEvent from './form/FieldsetCanceledEvent'
import FieldsetMessage from './form/FieldsetMessage'
import FieldsetName from './form/FieldsetName'
import FieldsetNewEvent from './form/FieldsetNewEvent'
import FieldsetReason from './form/FieldsetReason'

import PaperworkProgress from './form/PaperworkProgress'

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

function DraggableComponent({
  children,
  index,
}: {
  children: React.ReactElement
  index: number
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const draggableInstance = useRef<Draggable | null>(null);
  const isFocused = useRef(false) // Use ref instead of state to prevent re-renders

  useEffect(() => {
    if (!containerRef.current || !shadowRef.current) return

    let x, y = 0
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const seed = index * 123.456 * Math.random()
    const randomX = ((seed * 9301 + 49297) % 233280) / 233280
    const randomY = ((seed * 9307 + 49299) % 233281) / 233281
    x = randomX * (viewportWidth - 400) + 200
    y = randomY * (viewportHeight - 300) + 150

    // // Animate to position
    // gsap.to(containerRef.current, {
    //   x,
    //   y,
    //   xPercent: -50,
    //   yPercent: -50,
    //   duration: 0.8,
    //   ease: "power3.out",
    // })

    // // Set shadow position and hide it
    // gsap.set(shadowRef.current, {
    //   x,
    //   y,
    //   xPercent: -50,
    //   yPercent: -50,
    //   opacity: 0,
    // })

    // Clean up any existing draggable instance
    if (draggableInstance.current) {
      draggableInstance.current.kill();
      draggableInstance.current = null;
    }

    const draggables = Draggable.create(containerRef.current, {
      type: "x,y",
      bounds: document.body,
      onDragStart: function () {
        // Blur input when starting to drag
        if (
          contentRef.current && document.activeElement === 
          contentRef.current
        ) {
          contentRef.current.blur();
        }
      },
      onDrag: function () {
        // Update shadow position during drag
        if (shadowRef.current && gsap.getProperty(shadowRef.current, "opacity") === 0) {
          const elem = this.target as HTMLElement;
          gsap.set(shadowRef.current, {
            x: gsap.getProperty(elem, "x"),
            y: gsap.getProperty(elem, "y"),
            xPercent: -50,
            yPercent: -50,
          });
        }
      },
    });

    if (draggables && draggables.length > 0) {
      draggableInstance.current = draggables[0];
    }

    return () => {
      if (draggableInstance.current) {
        draggableInstance.current.kill();
        draggableInstance.current = null;
      }
    };

  }, [index])

  // Match shadow's size to content's
  useEffect(() => {
    if (!contentRef.current || !shadowRef.current) return
    shadowRef.current.style.width = `${contentRef.current.offsetWidth}px`
    shadowRef.current.style.height = `${contentRef.current.offsetHeight}px`
  }, [])

  const handleFocus = () => {
    if (isFocused.current || !containerRef.current || !shadowRef.current) return
    isFocused.current = true

    // NOTE: I'm not sure if I want to do this since I can prevent drag
    // if e.target is a Input/Textarea/Button
    // Disable dragging during focus
    // if (draggableInstance.current) {
    //   draggableInstance.current.disable();
    // }

    // Get current position of container
    const currX = gsap.getProperty(containerRef.current, "x") as number
    const currY = gsap.getProperty(containerRef.current, "y") as number
  
    // Position shadow at current location
    // gsap.set(shadowRef.current, {
    //   x: currX,
    //   y: currY,
    //   xPercent: -50,
    //   yPercent: -50,
    // })

    // Fade in the shadow imprint
    gsap.to(shadowRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    })

    // Animate to center with scale
    gsap.to(containerRef.current, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      xPercent: -50,
      yPercent: -50,
      scale: 1.5,
      duration: 0.8,
      ease: "power3.out",
    })
  }

  // Should this use useCallback?
  const handleBlur = () => {
    if (!isFocused.current || !containerRef.current || !shadowRef.current) return

    isFocused.current = false


    // Get shadow position to return to
    const shadowX = gsap.getProperty(shadowRef.current, "x") as number
    const shadowY = gsap.getProperty(shadowRef.current, "y") as number

    // Animate back to shadow position
    gsap.to(containerRef.current, {
      x: shadowX,
      y: shadowY,
      xPercent: -50,
      yPercent: -50,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
      onComplete: () => {
        // // Re-enable dragging after animation
        // if (draggableInstance.current && layoutMode === "random") {
        //   draggableInstance.current.enable();
        // }
      },
    })

    // Fade out the shadow imprint
    gsap.to(shadowRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
    })
  }

  // Prevent dragging when clicking on a form element
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = e.target
    if (
      el instanceof HTMLInputElement ||
      el instanceof HTMLTextAreaElement ||
      el instanceof HTMLButtonElement
    ) {
      el.focus()
      e.stopPropagation()
    }
  };

  return (
    <div
      // className="relative"
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
    >
      <DraggableShadow ref={shadowRef} />
      <DraggableContainer
        ref={containerRef}
        contentRef={contentRef} 
        onMouseDown={handleMouseDown}
      >
        { children }
      </DraggableContainer>
    </div>
  )

}

function DraggableShadow ({
  ref
}: {
  ref: React.RefObject<HTMLDivElement | null>
}): React.ReactElement<HTMLDivElement> {
  return (
    <div
      className="absolute pointer-events-none z-0 w-25 h-25 bg-black"
      style={{ transformOrigin: "center center" }}
      ref={ref}
    >
      <div className="flex flex-col gap-2 w-full h-full rounded-md bg-black/50 shadow-[inset_0_2px_20px_rgba(0,0,0,0.8)]">
      </div>
    </div>
  )
}

function DraggableContainer ({
  children,
  ref,
  contentRef,
  onMouseDown,
}: {
  children: React.ReactElement,
  ref: React.RefObject<HTMLDivElement | null>
  contentRef: React.RefObject<HTMLDivElement | null>
  onMouseDown: (e: React.MouseEvent<Element, MouseEvent>) => void
}): React.ReactElement<HTMLDivElement> {
  return (
    <div 
      ref={ref}
      onMouseDown={onMouseDown}
    >
      <div
        className="z-10"
        ref={contentRef}
      >
        { children }
      </div>
    </div>
  )
}

export default function RainCheckFormIII (): React.ReactElement {
    const [isComplete, setIsComplete] = useState(false)
    // Each fieldset has their own ID
    const [currentFieldset, setCurrentFieldset] = useState(0)
    const {
      // control,
      register,
      handleSubmit,
    } = useForm()

    function submitHandler () {}
  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="flex gap-8">
          <div className="flex flex-col justify-center gap-8">
            <DraggableComponent index={0}>
              <FieldsetName register={register} />
            </DraggableComponent>
            <DraggableComponent index={1}>
              <FieldsetCanceledEvent register={register} />
            </DraggableComponent>
            <DraggableComponent index={2}>
              <FieldsetAccent register={register} />
            </DraggableComponent>
          </div>
          <div className="flex flex-col justify-center gap-8">
            <DraggableComponent index={3}>
              <FieldsetReason register={register} />
            </DraggableComponent>
          </div>
          <div className="flex flex-col justify-center gap-8">
            <DraggableComponent index={4}>
              <FieldsetNewEvent register={register} />
            </DraggableComponent>
            <DraggableComponent index={5}>
              <FieldsetMessage register={register} />
            </DraggableComponent>
          </div>
        </div>
        <PaperworkProgress register={register} />
        {/* <div className="rounded-sm bg-amber-50">
          {
            isComplete
              ? <button type="submit">Issue Rain Check</button>
              : <button type="button">Next</button>
          }
        </div> */}
      </form>
      {/* <img src="/assets/img/form.png" /> */}
      </div>
  )
}
