---
title: "Pumping Lemma Intuition for Regular Languages"
summary: "A step-by-step derivation of the pumping lemma for regular languages, building intuition from DFAs and the pigeonhole principle."
date: "2024-07-27"
---

The goal of this text is to provide a complete and intuitive understanding of the pumping lemma. We will start from the basics and try to discover the lemma through a step by step process of discovery. Do keep in mind that a basic understanding of formal languages, regular languages and Deterministic Finite Automata (DFA) is expected.

The pumping lemma is used for both regular and context free languages. However, we will primarily keep focus on it for regular languages.

## Introduction

To begin we first need to think about regular languages. Recall that regular languages are formal languages that can be defined using regular expressions or finite automata. Let's take a look at an example:

![Formula 1](https://miro.medium.com/v2/resize:fit:800/format:webp/1*tEqUTJvJddYhLcEGN3cliQ.png)

Visualize a DFA or regular expression for this language, if it's hard to visualize, try to write it down. Figure 1 below shows the DFA.

**Figure 1:**

![Figure 1](https://miro.medium.com/v2/resize:fit:1024/format:webp/1*dOnMtfxwcK00rLupaElHGA.png)

Let's make another language very similar to `L1`.

![Formula 2](https://miro.medium.com/v2/resize:fit:636/format:webp/1*nzoIfLUmwfB6lXyOGMK5oA.png)

Try to see if you can make either a DFA or a regular expression for `L2`. You might see that it is impossible to make it (if you think you made something that works, are you sure it only accepts strings it is supposed to accept). The reasoning is because we can not possibly check the number of occurrences of `'a'` and limit our `'b'`s to the same amount. Therefore we are basically certain that `L2` is not a regular language.

Now that was an informal proof. We can make it more formal by accounting for all cases and ensuring our proof is complete. However this might take a while, and for each distinct language we encounter, it is wasteful to prove that they are not regular in unique ways. Hence, people develop simple generalizations that we can utilize to prove a wide range of languages. One of these proofs is using the Pumping Lemma, another is using the Myhill-Nerode Theorem.

## Pumping Quality

One way to develop a proof is for us to identify and define a quality of regular languages that is shared by all regular languages. This way if we can prove that this quality does not exist in a language, then it can not be regular. We have a more formal set of statements showing this below:

**Statement:** If a language `L` is regular, then "quality" exists in `L`.

**Contrapositive:** If "quality" does not exist in a language `L`, then `L` is not regular.

Our end goal is the contrapositive statement above, which can be used to prove that a language is not regular.

We will start by discussing a quality in infinite regular languages, and then we can try to generalize it to include all regular languages. This quality is the concept of loops. Specifically, let's visualize loops in the DFA of infinite regular languages. The DFA in figure 2 is a simple example of an infinite regular language expressed using 2 states.

**Figure 2:**

![Formula 2](https://miro.medium.com/v2/resize:fit:668/format:webp/1*Uyn4CxyJZMO6zTlgH4iV0w.png)
![Figure 2](https://miro.medium.com/v2/resize:fit:1024/format:webp/1*Zoaf77fDGsXSOOmHd08OaQ.png)

Examples of accepted strings: `""`, `"ab"`, `"abab"`, `"ababababababababab"`

Notice that being a finite automaton, DFAs can not have infinite states, however DFAs can have the potential to accept strings of any length because of their loops, just like with the example above. So how can we potentially utilize this quality?

One way is to say *"If `L` is an infinite regular language, then it must have loops."* While this statement is straightforward, it is also hard to work with. If you recall the contrapositive statement, the end goal is to show that the quality does not exist in a specific language `L`. However we can not visualize language `L` as a DFA/regex because it isn't regular. So determining if a loop does not exist is a nontrivial problem.

So let's rethink the quality. Instead of asserting that `L` must have loops, we can instead state, *"If `L` is an infinite regular language, then for any string `w` in language `L`, `w` must have been generated using a loop."* This alters our contrapositive statement so that we only need to show that a string `w` doesn't have a loop, in order to prove `L` is not an infinite regular language.

Now take a second to look at our current statement. Is it fully correct? **Hint:** Do all strings in an infinite regular language have loops in them?

So we face an issue. The string `w` we choose according to the statement doesn't necessarily need to use the loop present in language `L`. For example, looking back at figure 2, while string `"abab"` is generated using the loop, strings `"ab"` and `""` are not. This makes our statement incorrect.

To fix this we can modify our statement and restrict string `w` to be a string of length greater than the number of states in `L`. Does this work? Looking back at figure 2, if `w` can be any string accepted by the DFA but its length must be greater than 2, then you can not choose `""` or `"ab"` as `w`.

Why does it work? This works because of the **pigeonhole principle**, which states *"if n items are put into m containers, with n > m, then at least one container must contain more than one item."* In our situation if a finite DFA has `s` number of transition states, then to generate a string `w` with `s` or more letters requires a repeat of the states, implying that a loop has been used.

Through this modification our statement becomes: **"If `L` is a regular language, then for any string `w` of length at least `p` — called the 'pumping length' — in `L`, `w` must have been generated using a loop."** Notice here that the pumping length is an arbitrary constant that represents the minimum length that `w` must be in order to have a loop.

The updated statement redefines `L` to be a regular language instead of an infinite regular language. Why is this allowed? Simply put, if `L` were to be a finite language then our pumping length will ensure that there does not exist any string `w` in `L` such that it is at least the pumping length. Hence, finite regular languages are vacuously satisfied.

This is shown in figure 3 below, where language `L3` with a pumping length of 5 does not have any string `w` of length at least 5. Hence, the statement does not break.

**Figure 3:**

![Figure 3](https://miro.medium.com/v2/resize:fit:1024/format:webp/1*_WTzxQaGEZiapqSIPJijzw.png)

The final set of steps is to refine the statement for it to be easily used.

## Pumping Lemma

Refining the latest statement above (in bold) is challenging, because our goal is to make it easily usable. The last part of our statement where we assert that `w` must have been generated using a loop is correct but too vague to mathematically disprove.

Our first step might be to convert the English statement of "w must have a loop" to `w = y^i`, where `i ≥ 0` and `a` is an arbitrary string. Doing so mathematically defines what a loop is, but we do not account for situations where there are starting and beginning sequences of strings. To also account for such languages, we can redefine `w = x y^i z` where `i ≥ 0` and `x` and `z` take the role of containing such sequences. Now we have converted the definition of a loop into a mathematical statement. So for the DFA shown below, can you determine what `x`, `y`, `z` and `i` are given `w = abaabaabab`?

**Figure 4:**

![Figure 4](https://miro.medium.com/v2/resize:fit:1024/format:webp/1*YALPyK9xx7eRTy61mTQ1Pg.png)

The right answer is `x = aba`, `y = aba`, `z = b`, and `i = 2`. You could have said that `x` and `y` have the same string so you can increase `i` by 1 and make `x = ''` and `i = 3`. This does not work because if it does then it implies `i = 0` must also work, but it doesn't (when `i = 0`, `w = b` which is not a possible string generated from the DFA above). This process of checking whether `i` works for another number actually hints to how the pumping lemma is utilized.

> **[1]:** Note: While both work, we use `i ≥ 0` instead of 1. Using 0 helps with this idea of "pumping down" which we will see in the examples later on. For now understand that 0 or 1 work but we use 0 because of advantages like pumping down.

There are two more conditions we must add to finish our proof:

- **Condition `|y| > 0`:** An edge case where someone chooses `y = ''`. This implies that values of `i` would stay the same, meaning the string does not change in length as we iterate through the empty loop. Since there is no case where we would need this, we safely require `|y| > 0`.
- **Condition `|xy| ≤ p`:** Ensures that `y` is found within the first `p` characters (recall `p` is the pumping length). This condition is mostly satisfied by the definition we are trying to build, however through explicitly stating it we can use it in our original goal of proving a language is not regular.

Our final statement, which is also the accepted definition of the pumping lemma is:

> If `L` is a regular language, then there is a number `p` where if `w` is any string in `L` of length at least `p`, then `w` may be divided into three pieces, `w = xyz`, satisfying the following conditions:
>
> 1. for each `i ≥ 0`, `x y^i z ∈ L`.
> 2. `|y| > 0`, and
> 3. `|xy| ≤ p`.

In the next section we will look at some examples to understand how each part of this proof contributes in helping us disprove that a language is regular.

## Examples

![Formula 3](https://miro.medium.com/v2/resize:fit:636/format:webp/1*nzoIfLUmwfB6lXyOGMK5oA.png)

_(Lets try solving L2 from before, using the lemma)_

Let's assume that `L2` is regular for the purpose of causing a contradiction. Let `p` be the pumping length such that all strings `w` in `L2` are of length greater than `p`. For any such string `w`, it may be divided into `xyz` and must satisfy the conditions above. Up till this point the proof remains the same — now we must decide on a specific instance for `w` to find a contradiction.

**Choose** `w = a^p b^p`. This is a valid `w` as it exists in `L2` by definition and has length `2p ≥ p`.

**Apply condition 3:** `|xy| ≤ p`, so `y` must consist entirely of `a`'s because `w` starts with `p` a's. Combined with condition 2, `y` must be a *nonzero* number of `a`'s.

**Apply condition 1:** `x y^2 z ∈ L2`. But if `y` consists of only `a`'s, pumping it up means the number of `a`'s no longer equals the number of `b`'s — so `x y^2 z ∉ L2`. Contradiction.

Hence `L2` is not regular.
