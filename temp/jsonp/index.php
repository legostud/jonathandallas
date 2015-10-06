<?php

$callback = $_GET["callback"];
$response = $callback . '([{"Id":9,"Name":"Covering the Uninsured","Indicators":[{"Id":76,"Name":"Insurance status by type of coverage","Description":"This chart shows the share of the population that has health insurance, either through a public program such as Medicare, Medicaid or the Children&rsquo;s Health Insurance Program (CHIP), or through an employer or an individual policy. The measure also shows the share of the population that is uninsured.","IsHigherBetter":false,"Notes":"N\/A indicates that data were either not available or suppressed because there were fewer than 50 observations in the denominator.","ShortName":"Insurance Status by Type","SourceNotes":"<a href=\"http:\/\/www.shadac.org\/\">SHADAC<\/a> analysis of the 2008-2010 American Community Survey (ACS) Public Use Microdata Sample (PUMS) files.","TrendGroups":[
				{"Id":76,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":92,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":92,"Name":"Uninsurance Rates","Description":"","IsHigherBetter":false,"Notes":"","ShortName":"","SourceNotes":"",
			"TrendGroups":[
				{"Id":92,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":76,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":55,"Name":"Participation rate in public insurance programs","Description":"Many people are eligible for health insurance through Medicaid or the Children&rsquo;s Health Insurance Program (CHIP) but are not enrolled in these programs. This chart shows, separately for adults and children, the percent who appear to be eligible for Medicaid or CHIP who are actually enrolled in one of these programs.","IsHigherBetter":true,"Notes":"Participation rates are defined as the ratio of Medicaid eligible enrolled adults to Medicaid eligible enrolled adults plus Medicaid eligible uninsured adults as determined by the Urban Institute&rsquo;s eligibility simulation model. Participation rates exclude those with employer\/union-based or military coverage. See Kenney, G., V. Lynch, J. Haley, and M. Huntress. Forthcoming. Variation in Medicaid Eligibility and Participation Among Adults: Implications for the Affordable Care Act., for further details. Standard errors are calculated using replicate weights that take into account the complex nature of the sample design. Estimates reflect an adjustment for the underreporting of Medicaid\/CHIP and the overreporting of private non-group coverage. Medicaid eligibility is defined as eligibility for comprehensive Medicaid benefits. N\/A indicates that data were suppressed because the confidence interval was wider than 10 percentage points.","ShortName":"Public Program Participation Rate","SourceNotes":"Urban Institute analysis using the Urban Institute Health Policy Centers ACS Medicaid\/CHIP Eligibility Simulation Model, developed under a grant from the Robert Wood Johnson Foundation, based on American Community Survey (ACS) 2010 data from the Integrated Public Use Microdata Series (IPUMS).",
			"TrendGroups":[
				{"Id":55,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":76,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":24,"Name":"Percent of firms offering coverage","Description":"This chart shows the percent of companies that offer health insurance to their employees.","IsHigherBetter":true,"Notes":"Estimates represent 2 year averages.&nbsp; Data were not available for 2007.&nbsp; N\/A indicates that data were not available or suppressed by AHRQ due to large standard errors.","ShortName":"Companies Offering Health Insurance","SourceNotes":"2001-2009 Medical Expenditure Panel Survey - Insurance Component (MEPS-IC), Agency for Healthcare Research and Quality, Center for Cost and Financing Studies.",
			"TrendGroups":[
				{"Id":24,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":76,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":64,"Name":"Percent of workers in firms that offer coverage","Description":"This chart shows the percent of all workers who work at a company that offers health insurance to its employees.","IsHigherBetter":true,"Notes":"Estimates represent 2 year averages.&nbsp; Data were not available for 2007.&nbsp;N\/A indicates that data were not available or suppressed by AHRQ due to large standard errors.","ShortName":"Percent of Workers in Companies That Offer Health Insurance","SourceNotes":"&nbsp;Medical Expenditure Panel Survey - Insurance Component (MEPS-IC), Agency for Healthcare Research and Quality, Center for Cost and Financing Studies.",
			"TrendGroups":[
				{"Id":64,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":76,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":13,"Name":"Percent of individuals in families with a high health care cost burden","Description":"This chart shows the share of individuals who are in families where out-of-pocket spending on health care, including premiums, accounted for more than 10 percent of annual income.","IsHigherBetter":false,"Notes":"","ShortName":"People with High Health Care Cost Burden","SourceNotes":"<a href=\"http:\/\/www.shadac.org\/\">SHADAC<\/a> analysis of the 2011 Annual Social &amp; Economic Supplement (ASEC) to the Current Population Survey (CPS).",
			"TrendGroups":[
				{"Id":13,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":76,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":93,"Name":"Uninsurance","Description":"","IsHigherBetter":false,"Notes":"","ShortName":"","SourceNotes":"",
			"TrendGroups":[
				{"Id":93,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":76,"Name":"2010-2012","count":3,"isSelected":false}
			]
		}
	],
	"ShortName":"Covering Uninsured"
},
{
	"Id":13,"Name":
	"Bringing Down Health Care Spending",
	"Indicators":[
		{"Id":34,"Name":"Medicare costs per enrollee ","Description":"This chart shows the average amount Medicare spends per enrollee in each state.","IsHigherBetter":false,"Notes":"Data were adjusted for age, sex, race, and price. More information about methodology available <a href=\"http:\/\/www.dartmouthatlas.org\">here<\/a>.","ShortName":"Medicare Costs Test Test Test","SourceNotes":"Dartmouth Atlas of Healthcare analysis of 20% Medicare claims sample available <a href=\"http:\/\/www.dartmouthatlas.org\/tools\/downloads.aspx\">here<\/a>.",
			"TrendGroups":[
				{"Id":34,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":70,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":70,"Name":"Medicaid costs per enrollee","Description":"This chart shows the average amount Medicaid spends per enrollee in each state.","IsHigherBetter":false,"Notes":"Spending includes both state and federal payments to Medicaid. Figures represent the average (mean) level of payments across all Medicaid enrollees. Spending per enrollee does not include disproportionate share hospital payments (DSH).","ShortName":"Medicaid Costs","SourceNotes":"Kaiser Commission on Medicaid and the Uninsured and Urban Institute estimates based on the FY 2009 Medicaid Statistical Information Statistics (MSIS) and 2012 CMS-64 reports available <a href=\"http:\/\/www.statehealthfacts.org\/comparemaptable.jsp?ind=183&amp;amp;cat=4\">here<\/a>.",
			"TrendGroups":[
				{"Id":70,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":34,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":33,"Name":"Medicaid expenses as a percent of state budgets","Description":"This chart shows state and federal spending on Medicaid as a share of each state&rsquo;s budget.","IsHigherBetter":false,"Notes":"Medicaid expenditures include both state and federal dollars.","ShortName":" Portion of State Budgets Spent on Medicaid","SourceNotes":"2000-2010 State Expenditure Reports, National Association of State Budget Officers.",
			"TrendGroups":[
				{"Id":33,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":34,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":21,"Name":"Average premium for employer-sponsored health insurance","Description":"This chart shows the average yearly premium for a worker who gets health insurance through his or her employer.","IsHigherBetter":false,"Notes":"Estimates represent 2 year averages.&nbsp; Data were not available for 2007.&nbsp;N\/A indicates that data were not available or suppressed by AHRQ due to large standard errors.","ShortName":"Average Premium for Employer Health Insurance","SourceNotes":"Medical Expenditure Panel Survey - Insurance Component (MEPS-IC), Agency for Healthcare Research and Quality, Center for Cost and Financing Studies.",
			"TrendGroups":[
				{"Id":21,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":34,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":36,"Name":"Average monthly premium in the individual market","Description":"This chart shows the average health insurance premium for an insurance plan purchased by an individual.","IsHigherBetter":false,"Notes":"N\/A indicates that data were not available. Average values represent total premium revenue divided by the total member months of all major medical individual market plans for which data were available in each state in 2010. Only plans in the individual market providing medical coverage were included in the analysis. For additional information on premium variation please see Mapping Premium Variation in the Individual Market available <a href=\"http:\/\/www.kff.org\/healthreform\/8214.cfm\">here<\/a>.","ShortName":"Average Premium for Individual Insurance Policies","SourceNotes":"Based on data from Mark Farah Associates Health Coverage Portal presented on Kaiser State Health Facts available <a href=\"http:\/\/statehealthfacts.org\/comparemaptable.jsp?ind=976&amp;cat=5\">here<\/a>.",
			"TrendGroups":[
				{"Id":36,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":34,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":23,"Name":"Expenses per inpatient day","Description":"This chart shows the average expenses for one day of inpatient care at a hospital.","IsHigherBetter":false,"Notes":"Includes all operating and non-operating expenses for registered US community hospitals, defined as nonfederal short-term general and other special hospitals whose facilities and services are available to the public. Adjusted expenses per inpatient day include expenses incurred for both inpatient and outpatient care; inpatient days are adjusted higher to reflect an estimate of the volume of outpatient services. It is important to note that these figures are only an estimate of expenses incurred (by the hospital to provide a day of) inpatient care and are not a substitute for either actual charges or reimbursement for care provided.","ShortName":"Average Expenses for a Day of Hospital Care","SourceNotes":"Based on data from the 2000-2010 AHA Annual Surveys presented on the Kaiser Family Foundation State Health Facts available <a href=\"http:\/\/statehealthfacts.org\/comparemaptable.jsp?ind=273&amp;cat=5\">here<\/a>.",
			"TrendGroups":[
				{"Id":23,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":34,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":49,"Name":"Per person costs of potentially preventable hospitalizations","Description":"Potentially preventable hospitalizations are hospital visits that research suggests could have been avoided with better access to high-quality outpatient care, such as care provided in doctor&rsquo;s offices, clinics or other settings outside the hospital. This chart shows how much these hospitalizations cost per person in each state.","IsHigherBetter":false,"Notes":"N\/A indicates that data were not available. National results were calculated on the Nationwide Inpatient Sample. State specific results were calculated by using the State Inpatient Databases. Both types of files are made available through the Healthcare Cost and Utilization Project. Total costs associated with potentially preventable hospitalizations were calculated by multiplying charges times relevant cost to charge ratios, which adjust charges to costs. Results adjusted for age and sex.","ShortName":"Costs of Potentially Preventable Hospitalizations","SourceNotes":"SHADAC analysis of 2009 Healthcare Cost and Utilization Project (HCUP) data using the Agency for Healthcare Research and Quality (AHRQ) Patient Quality Indicator (PQI).",
			"TrendGroups":[
				{"Id":49,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":34,"Name":"2010-2012","count":3,"isSelected":false}
			]
		}
	],
	"ShortName":"Health Care Costs"
},
{
	"Id":15,
	"Name":"Improving the Quality, Value and Equality of Health Care",
	"Indicators":[
		{"Id":29,"Name":"Percent of children ages 19-35 months who received all recommended vaccines","Description":"This chart shows the percent of children ages 19-35 months who received all recommended vaccines.","IsHigherBetter":true,"Notes":"N\/A indicates that data were not available. Vaccination rates for 2008 and 2009 are not shown due to changes in the recommendations during those years and shortages of one of the recommended vaccines.","ShortName":"Kids Immunizations","SourceNotes":"2000-2010 National Immunization Survey summary tables available <a href=\"http:\/\/www.cdc.gov\/vaccines\/stats-surv\/nis\/default.htm#nis\">here<\/a>.",
			"TrendGroups":[
				{"Id":29,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":8,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":8,"Name":"Percent of adults who have received recommended cancer screenings","Description":"This chart shows the percent of adults who have received recommended cancer screenings, including pap smears, colorectal cancer screenings, and mammograms.","IsHigherBetter":true,"Notes":"N\/A indicates that data were not available.","ShortName":"Adult Cancer Screenings","SourceNotes":"<a href=\"http:\/\/www.shadac.org\/\">SHADAC<\/a> analysis of&nbsp; Behavioral Risk Factor Surveillance Surveys (BRFSS).",
			"TrendGroups":[
				{"Id":8,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":29,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":17,"Name":"Percent of adults age 40 and over with diagnosed diabetes who received a hemoglobin A1c measurement, a dilated eye examination, and  had their feet checked for sores or irritation in the calendar year","Description":"This chart shows the percent of adult diabetics over age 40 who received three kinds of standard preventive care for their condition in the calendar year. The standard care includes a blood test to measure their level of hemoglobin A1c, a dilated eye exam and a check of their feet to look for sores or irritation.","IsHigherBetter":true,"Notes":"Estimates represent 2 year averages.&nbsp; N\/A indicates that data were not available.","ShortName":"Comprehensive Adult Diabetes Care","SourceNotes":"<a href=\"http:\/\/www.shadac.org\/\">SHADAC<\/a> analysis of the 2001-2010 Behavioral Risk Factor Surveillance Surveys (BRFSS).",
			"TrendGroups":[
				{"Id":17,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":29,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":42,"Name":"Medicare beneficiaries giving a best rating for health care they received in the last 12 months","Description":"This chart shows the percent of adults on Medicare who had a doctor&rsquo;s office or clinic visit in the last 12 months and gave a best rating for health care they received.","IsHigherBetter":true,"Notes":"N\/A indicates that data were not available.","ShortName":"Medicare Patient Satisfaction","SourceNotes":"2007-2009 National CAHPS Benchmarking Database, Agency for Healthcare Research and Quality (AHRQ), Center for Quality Improvement and Patient Safety.",
			"TrendGroups":[
				{"Id":42,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":29,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":30,"Name":"Central line infections per 1,000 admissions","Description":"This chart shows the rate of hospital admissions where a central venous catheter or &ldquo;central line,&rdquo; a common type of catheter user in hospitals, became infected.","IsHigherBetter":false,"Notes":"N\/A indicates that data were not available. National results were calculated on the Nationwide Inpatient Sample. State specific results were calculated by using the State Inpatient Databases. Both types of files are made available through the Healthcare Cost and Utilization Project.","ShortName":"Hospital Infections","SourceNotes":"<a href=\"http:\/\/www.shadac.org\/\">SHADAC<\/a> analysis of 2009 Healthcare Cost and Utilization Project (HCUP) data using the Agency for Healthcare Research and Quality (AHRQ) Patient Safety Indicator.",
			"TrendGroups":[
				{"Id":30,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":29,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":1,"Name":"Acute potentially preventable hospitalizations (urinary infections, pneumonia, dehydration) per 100,000 adults","Description":"Potentially preventable hospitalizations are hospital visits that research suggests could have been avoided with better access to high-quality outpatient care, such as care provided in doctor&rsquo;s offices, clinics or other settings outside the hospital. This chart shows the rate of such hospitalizations for the acute conditions of urinary infections, pneumonia and dehydration.","IsHigherBetter":false,"Notes":"N\/A indicates that data were not available. National results were calculated on the Nationwide Inpatient Sample. State specific results were calculated by using the State Inpatient Databases. Both types of files are made available through the Healthcare Cost and Utilization Project. Results adjusted for age and sex.","ShortName":"Potentially Preventable Hospitalizations for Adults with Certain Acute Conditions","SourceNotes":"<a href=\"http:\/\/www.shadac.org\/\">SHADAC<\/a> analysis of 2009 Healthcare Cost and Utilization Project (HCUP) data using the Agency for Healthcare Research and Quality (AHRQ) Patient Quality Indicator (PQI).",
			"TrendGroups":[
				{"Id":1,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":29,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":9,"Name":"Potentially preventable hospitalizations related to chronic disease (diabetes, congestive heart failure, hypertension, angina, chronic obstructive pulmonary disease and asthma) per 100,000 adults","Description":"Potentially preventable hospitalizations are hospital visits that research suggests could have been avoided with better access to high-quality outpatient care, such as care provided in doctor&rsquo;s offices, clinics or other settings outside the hospital. This chart shows the rate of such hospitalizations that are related to diabetes, congestive heart failure, hypertension, angina, chronic obstructive pulmonary disease and asthma.","IsHigherBetter":false,"Notes":"N\/A indicates that data were not available. National results were calculated on the Nationwide Inpatient Sample. State specific results were calculated by using the State Inpatient Databases. Both types of files are made available through the Healthcare Cost and Utilization Project. Results adjusted for age and sex.","ShortName":"Potentially Preventable Hospitalizations for Adults with Certain Chronic Diseases","SourceNotes":"<a href=\"http:\/\/www.shadac.org\/\">SHADAC<\/a> analysis of 2009 Healthcare Cost and Utilization Project (HCUP) data using the Agency for Healthcare Research and Quality (AHRQ) Patient Quality Indicator (PQI).",
			"TrendGroups":[
				{"Id":9,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":29,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":43,"Name":"Overall potentially preventable pediatric hospitalizations (diabetes, asthma, urinary infections, gastroenteritis) per 100,000 children","Description":"Potentially preventable hospitalizations are hospital visits that research suggests could have been avoided with better access to high-quality outpatient care, such as care provided in doctor&rsquo;s offices, clinics or other settings outside the hospital. This chart shows the rate of such hospitalizations among kids for diabetes, asthma, urinary infections and gastroenteritis.","IsHigherBetter":false,"Notes":"N\/A indicates that data were not available. National results were calculated on the Nationwide Inpatient Sample. State specific results were calculated by using the State Inpatient Databases. Both types of files are made available through the Healthcare Cost and Utilization Project. Results adjusted for age and sex.","ShortName":"Potentially Preventable Pediatric Hospitalizations","SourceNotes":"<a href=\"http:\/\/www.shadac.org\/\">SHADAC<\/a> analysis of 2009 Healthcare Cost and Utilization Project (HCUP) data using the Agency for Healthcare Research and Quality (AHRQ) Patient Quality Indicator (PQI).",
			"TrendGroups":[
				{"Id":43,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":29,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":50,"Name":"Percent of ER visits that are potentially avoidable ","Description":"This chart shows the percent of ER visits that might have been avoided with better access to high-quality outpatient care or that could have been safely delivered in another setting, such as a clinic or doctor&rsquo;s office.","IsHigherBetter":false,"Notes":"<p dir=\"ltr\" style=\"margin-right: 0px;\">N\/A indicates that data were not available. Emergency room visits were classified into the following categories:&nbsp;<br \/>\u000a<br \/>\u000a&bull; Non-emergent - The patients initial complaint, presenting symptoms, vital signs, medical history, and age indicated that immediate medical care was not required within 12 hours;<br \/>\u000a<br \/>\u000a&bull; Emergent\/Primary Care Treatable - Based on information in the record, treatment was required within 12 hours, but care could have been provided effectively and safely in a primary care setting. <br \/>\u000a<br \/>\u000a&bull; Emergent &ndash; ED Care Needed - Preventable\/Avoidable - Emergency department care was required based on the complaint or procedures performed\/resources used, but the emergent nature of the condition was potentially preventable\/avoidable if timely and effective ambulatory care had been received during the episode of illness);<br \/>\u000a<br \/>\u000a&bull; Emergent - ED Care Need, Not Preventable\/Avoidable - Emergency department care was required and ambulatory care treatment could not have prevented the condition <br \/>\u000a<br \/>\u000aThe first three categories were grouped as \"potentially avoidable\".&nbsp; More information about the NYU algorithm is available at <a href=\"http:\/\/wagner.nyu.edu\/chpsr\/ed_background.shtml\">http:\/\/wagner.nyu.edu\/chpsr\/ed_background.shtml<\/a>. <\/p>","ShortName":"Avoidable ER Visits","SourceNotes":"<a href=\"http:\/\/www.shadac.org\/\">SHADAC<\/a> analysis of 2009 Healthcare Cost and Utilization Project (HCUP) State Emergency Department Data (SEDD) using the NYU Center for Health and Public Service Research emergency visit classification algorithm.",
			"TrendGroups":[
				{"Id":50,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":29,"Name":"2010-2012","count":3,"isSelected":false}
			]
		}
	],
	"ShortName":"Health Care Quality, Value and Equality"
},
{
	"Id":2,
	"Name":"Preventing Disease and Promoting Healthier Lifestyles",
	"Indicators":[
		{"Id":2,"Name":"Binge drinking: percent of adults consuming four (women) or five (men) or more drinks on one occasion during the past 30 days","Description":"Binge drinking is defined as four or more drinks for women or five or more drinks for men on one occasion. This chart shows the rate of binge drinking among adults.","IsHigherBetter":false,"Notes":"Estimates represent 2 year averages.&nbsp; Breakdowns by education include adults age 25 and older, other breakdowns include all adults age 18 and older.&nbsp; N\/A indicates that data were either not available or suppressed because there were fewer than 50 observations in the denominator, or because relative standard errors (RSEs) were larger than 30%.","ShortName":"Adult Binge Drinking","SourceNotes":"<a href=\"http:\/\/www.shadac.org\/\">SHADAC<\/a> analysis of the 2005-2010 Behavioral Risk Factor Surveillance Survey (BRFSS).",
			"TrendGroups":[
				{"Id":2,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":37,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":37,"Name":"Prevalence of obesity (BMI > 30) among adults","Description":"Obesity is defined as a Body Mass Index (BMI) of over 30. This chart shows the prevalence of obesity among adults.","IsHigherBetter":false,"Notes":"Estimates represent 2 year averages.&nbsp; Breakdowns by education include adults age 25 and older, other\u000abreakdowns include all adults age 18 and older.&nbsp;N\/A indicates that data were either not available or suppressed because there were fewer than 50 observations in the denominator, or because relative standard errors (RSEs) were larger than 30%.","ShortName":"Adult Obesity","SourceNotes":"<a href=\"http:\/\/www.shadac.org\/\">SHADAC<\/a> analysis of the 2001-2010 Behavioral Risk Factor Surveillance Survey (BRFSS).",
			"TrendGroups":[
				{"Id":37,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":2,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":59,"Name":"Percent of adults who have smoked 100 or more cigarettes in their lifetime and who currently smoke some days or every day ","Description":"This chart shows the percent of heavy and chronic smokers.","IsHigherBetter":false,"Notes":"Estimates represent 2 year averages.&nbsp; Breakdowns by education include adults age 25 and older, other\u000abreakdowns include all adults age 18 and older.&nbsp;N\/A indicates that data\u000awere either not available or suppressed because there were fewer than 50\u000aobservations in the denominator, or because relative standard errors\u000a(RSEs) were larger than 30%.","ShortName":"Adult Smoking","SourceNotes":"<a href=\"http:\/\/www.shadac.org\/\">SHADAC<\/a> analysis of the 2001-2010 Behavioral Risk Factor Surveillance Survey (BRFSS).",
			"TrendGroups":[
				{"Id":59,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":37,"Name":"2010-2012","count":2,"isSelected":false}
			]
		},
		{"Id":26,"Name":"Percent of high school students not meeting recommendations for 60 minutes of physical activity each day (previous 5 days)","Description":"This chart shows the percent of high school students who have not engaged in at least 60 minutes of physical activity each day in the past five days.","IsHigherBetter":true,"Notes":"N\/A indicates that data were not available or suppressed by the CDC because the sample was not representative of all students in grades 9-12 attending public schools in each jurisdiction.","ShortName":"High School Physical Activity","SourceNotes":"2005-2009 High School Youth Risk Behavior Surveillance System Data Centers for Disease Control and Prevention (CDC) available <a href=\"http:\/\/apps.nccd.cdc.gov\/youthonline\">here<\/a>.",
			"TrendGroups":[
				{"Id":26,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":37,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":27,"Name":"Prevalence of obesity among high school students","Description":"&nbsp;This chart shows the percent of high school students who are obese.","IsHigherBetter":false,"Notes":"Students who were &gt; 95th percentile for body mass index, based on\u000asex- and age-specific reference data from the 2000 CDC growth charts, are\u000aconsidered obese.&nbsp; N\/A indicates that data were not available or suppressed by the CDC because the sample was not representative of all students in grades 9-12 attending public schools in each jurisdiction.","ShortName":"High School Obesity","SourceNotes":"2001-2009 High School Youth Risk Behavior Surveillance System Data, Centers for Disease Control and Prevention (CDC) available <a href=\"http:\/\/apps.nccd.cdc.gov\/youthonline\">here<\/a>.",
			"TrendGroups":[
				{"Id":27,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":37,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":28,"Name":"Percent of high school students who have smoked at least one cigarette in the past 30 days","Description":"This chart shows the percent of high school students who have smoked at least one cigarette in the past 30 days.","IsHigherBetter":false,"Notes":"N\/A indicates that data were not available or suppressed by the CDC because the sample was not representative of all students in grades 9-12 attending public schools in each jurisdiction.","ShortName":"High School Smoking","SourceNotes":"2001-2009 High School Youth Risk Behavior Surveillance System Data, Centers for Disease Control and Prevention (CDC) available <a href=\"http:\/\/apps.nccd.cdc.gov\/youthonline\">here<\/a>.",
			"TrendGroups":[
				{"Id":28,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":37,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":5,"Name":"State has requirement for BMI or other weight assessment in schools","Description":"This map indicates whether a state has requirements for BMI testing or other weight assessments in schools.","IsHigherBetter":false,"Notes":"","ShortName":"BMI Screening in Youth","SourceNotes":"<em>F as in Fat: How Obesity Threatens Americas Future 2011<\/em>, Trust for Americas Health (TFAH).",
			"TrendGroups":[
				{"Id":5,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":37,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":56,"Name":"State has passed laws requiring schools to provide certain number of minutes and\/or a specified difficulty level of physical activity","Description":"This map indicates whether a state has passed laws requiring schools to provide a certain number of minutes and\/or a specified difficulty level of physical activity.","IsHigherBetter":false,"Notes":"","ShortName":"High School Physical Activity Policy","SourceNotes":"<em>F as in Fat: How Obesity Threatens Americas Future 2011<\/em>, Trust for Americas Health (TFAH)",
			"TrendGroups":[
				{"Id":56,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":37,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":58,"Name":"Tobacco use prevention and control legislation enacted in each state: smoke-free campuses.","Description":"This map shows whether a state has enacted laws to ensure smoke-free college campuses.","IsHigherBetter":false,"Notes":"","ShortName":"Tobacco Free Campuses","SourceNotes":"State Tobacco Activities Tracking and Evaluation (STATE) System, Centers for Disease Control and Prevention (CDC) available <a href=\"http:\/\/apps.nccd.cdc.gov\/statesystem\/Default\/Default.aspx\">here<\/a>.",
			"TrendGroups":[
				{"Id":58,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":37,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":63,"Name":"Nutritional standards for school meals stronger than the USDA","Description":"This map indicates whether a state has adopted nutrition standards for school meals that are stricter than USDA requirements.","IsHigherBetter":false,"Notes":"","ShortName":"Nutrition Policies","SourceNotes":"<em>F as in Fat: How Obesity Threatens Americas Future 2011<\/em>, Trust for Americas Health (TFAH).",
			"TrendGroups":[
				{"Id":63,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":37,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":38,"Name":"Growth in obesity rates 2001-2010","Description":"This chart shows the increase in obesity rates over the past 10 years.","IsHigherBetter":false,"Notes":"","ShortName":"Increase in Obesity","SourceNotes":"<a href=\"http:\/\/www.shadac.org\/\">SHADAC<\/a> analysis of the 2001-2010 Behavioral Risk Factor Surveillance Survey (BRFSS).",
			"TrendGroups":[
				{"Id":38,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":37,"Name":"2010-2012","count":3,"isSelected":false}
			]
		}
	],
	"ShortName":"Disease and Healthier Lifestyles"
},
{
	"Id":6,
	"Name":"Strengthening Public Health",
	"Indicators":[
		{"Id":10,"Name":"Prevalence of Diabetes, CVD and Asthma in Adults","Description":"This chart shows the percent of adults who report having one or more of three chronic conditions: diabetes, cardiovascular disease and asthma.","IsHigherBetter":false,"Notes":"Estimates represent 2 year averages.&nbsp; Breakdowns by education include adults age 25 and older, other\u000abreakdowns include all adults age 18 and older.&nbsp;N\/A indicates that data\u000awere either not available or suppressed because there were fewer than 50\u000aobservations in the denominator, or because relative standard errors\u000a(RSEs) were larger than 30%.","ShortName":"Chronic Disease Prevalence","SourceNotes":"<a href=\"http:\/\/www.shadac.org\/\">SHADAC<\/a> analysis of the 2001-2010 Behavioral Risk Factor Surveillance Survey (BRFSS).",
			"TrendGroups":[
				{"Id":10,"Name":"2001-2010","count":5,"isSelected":false},
				{"Id":15,"Name":"2010-2012","count":3,"isSelected":true}
			]
		},
		{"Id":15,"Name":"Average number of days in the previous 30 days when a person indicates their activities are limited due to mental or physical health difficulties","Description":"This chart shows the average number of days in the last 30 days in which a person reports limited activity due to mental or physical health difficulties.","IsHigherBetter":false,"Notes":"Estimates represent 2 year averages.&nbsp; Breakdowns by education include adults age 25 and older, other\u000abreakdowns include all adults age 18 and older.&nbsp;N\/A indicates that data\u000awere either not available or suppressed because there were fewer than 50\u000aobservations in the denominator, or because relative standard errors\u000a(RSEs) were larger than 30%.","ShortName":"Limited Activity","SourceNotes":"<a href=\"http:\/\/www.shadac.org\/\">SHADAC<\/a> analysis of the 2001-2010 Behavioral Risk Factor Surveillance Survey (BRFSS).",
			"TrendGroups":[
				{"Id":15,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":10,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":45,"Name":"Self-reported health status: percent of adults reporting fair or poor health","Description":"This chart shows the percent of adults who report being in poor or fair health.","IsHigherBetter":false,"Notes":"Estimates represent 2 year averages.&nbsp; Breakdowns by education include adults age 25 and older, other\u000abreakdowns include all adults age 18 and older.","ShortName":"Poor\/Fair Health","SourceNotes":"<a href=\"http:\/\/www.shadac.org\/\">SHADAC<\/a> analysis of the 2001-2010 Behavioral Risk Factor Surveillance Survey (BRFSS).",
			"TrendGroups":[
				{"Id":45,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":10,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":6,"Name":"Incidence of breast, cervical, lung and colorectal cancer per 100,000 population; age adjusted","Description":"This chart shows the incidence of breast, cervical, lung and colorectal cancer across all ages.","IsHigherBetter":false,"Notes":"Estimates were age adjusted to the U.S. 2000 standard population. Data are suppressed if fewer than 16 cases are reported in the specific category or if the confidence interval around the estimate is larger than 30% of the overall rate. Data are from selected statewide and metropolitan area cancer registries that meet data quality criteria.","ShortName":"Cancer Incidence","SourceNotes":"Wide-ranging Online Data for Epidemiologic Research (WONDER) online databases, Centers for Disease Control and Prevention (CDC) and National Cancer Institute available <a href=\"http:\/\/wonder.cdc.gov\/\">here.<\/a>",
			"TrendGroups":[
				{"Id":6,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":10,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":7,"Name":"Incidence of breast, cervical, lung and colorectal cancer per 100,000 population; age adjusted","Description":"This chart shows the incidence of breast, cervical, lung and colorectal cancer across all ages by race.","IsHigherBetter":false,"Notes":"Estimates were age adjusted to the U.S. 2000 standard population. Data are suppressed if fewer than 16 cases are reported in the specific category or if the confidence interval around the estimate is larger than 30% of the overall rate. Data are from selected statewide and metropolitan area cancer registries that meet data quality criteria.","ShortName":"Cancer Incidence by Race","SourceNotes":"Wide-ranging Online Data for Epidemiologic Research (WONDER) online databases, Centers for Disease Control and Prevention (CDC) and National Cancer Institute available <a href=\"http:\/\/wonder.cdc.gov\/\">here<\/a>",
			"TrendGroups":[
				{"Id":7,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":10,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":31,"Name":"Life expectancy at birth: number of years that a newborn is expected to live if current mortality rates continue to apply","Description":"This chart shows the life expectancy of newborns if current mortality rates continue to apply.","IsHigherBetter":true,"Notes":"","ShortName":"Life Expectancy","SourceNotes":"American Human Development Project of the Social Science Research Council available <a href=\"http:\/\/www.measureofamerica.org\/maps\/\">here<\/a>.",
			"TrendGroups":[
				{"Id":31,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":10,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":22,"Name":"State cigarette excise tax rate ($)","Description":"This chart shows the rates of excise taxes on cigarettes in each state.","IsHigherBetter":true,"Notes":"","ShortName":"Tobacco Taxes","SourceNotes":"State Tobacco Activities Tracking and Evaluation (STATE) System, Centers for Disease Control and Prevention (CDC) available <a href=\"http:\/\/apps.nccd.cdc.gov\/statesystem\/Default\/Default.aspx\">here<\/a>.",
			"TrendGroups":[
				{"Id":22,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":10,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":44,"Name":"Per capita state public health funding","Description":"This chart shows per capita public health funding in each state.","IsHigherBetter":true,"Notes":"Dollar amount represents state per capita public health funding during the fiscal year. Figures represent state funding only.","ShortName":"Public Health Funding","SourceNotes":"<em>Shortchanging Americas Health 2005-2010<\/em>, <em>Investing in Americas Health 2011<\/em>, Trust for Americas Health (TFAH).",
			"TrendGroups":[
				{"Id":44,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":10,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":65,"Name":"Premature deaths: Average number of years of potential life lost prior to age 75 per 100,000 population","Description":"This chart shows the average number of years lost due to premature death (deaths that occur before the average age of death within a given population) prior to age 75.","IsHigherBetter":false,"Notes":"","ShortName":"Premature Death","SourceNotes":"Web-based Injury Statistics Query and Reporting System (WISQARS) database system, National Center for Injury Prevention and Control, Centers for Diseases Control and Prevention (CDC) available <a href=\"http:\/\/www.cdc.gov\/injury\/wisqars\/\">here<\/a>.",
			"TrendGroups":[
				{"Id":65,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":10,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":66,"Name":"Premature deaths: Average number of years of potential life lost prior to age 75 per 100,000 population","Description":"This chart shows the average number of years lost due to premature death (deaths that occur before the average age of death within a given population) prior to age 75.","IsHigherBetter":false,"Notes":"","ShortName":"Premature Death by Race\/Ethnicity","SourceNotes":"Web-based Injury Statistics Query and Reporting System (WISQARS) database system, National Center for Injury Prevention and Control, Centers for Diseases Control and Prevention (CDC) available <a href=\"http:\/\/www.cdc.gov\/injury\/wisqars\/\">here<\/a>.",
			"TrendGroups":[
				{"Id":66,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":10,"Name":"2010-2012","count":3,"isSelected":false}
			]
		}
	],
	"ShortName":"Public Health"
},
{
	"Id":11,
	"Name":"Addressing the Social Determinants of Health",
	"Indicators":[
		{"Id":82,"Name":"Adult educational attainment","Description":"This chart shows the percent of adults over age 25 who did not finish high school, graduated high school,&nbsp; had some college, or have a college degree or higher.","IsHigherBetter":false,"Notes":"N\/A indicates that data were either not available or suppressed because there were fewer than 50 observations in the denominator or because relative standard errors were larger than 30%.","ShortName":"Levels of Adult Education","SourceNotes":"<a href=\"http:\/\/www.shadac.org\/\">SHADAC<\/a> analysis of the 2000-2010 American Community Survey (ACS) Integrated Public Use Microdata Series (IPUMS).",
			"TrendGroups":[
				{"Id":82,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":25,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":25,"Name":"Income Inequality (Gini Coefficient)","Description":"This chart measures the degree of income inequality in each state. Higher values indicate more income inequality.","IsHigherBetter":false,"Notes":"The Gini coefficient is a number between zero and one that measures the extent of inequality in the distribution of income.&nbsp; Estimates closer to one indicate greater income inequality.","ShortName":"Income Inequality","SourceNotes":"U.S. Census Bureau analysis of the 2006-2010 American Community Survey (ACS).",
			"TrendGroups":[
				{"Id":25,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":82,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":48,"Name":"Percent children considered to be poor (<100% FPG) ","Description":"The Federal Poverty Guidelines are based on a formula that determines the minimum amount of money a family would need for basic expenses. They are used by the Department of Health and Human Services to determine eligibility for a number of federal programs. This chart shows the percent of children considered to be in poverty based on the guidelines (&lt;100% FPG).","IsHigherBetter":false,"Notes":"N\/A indicates that data were either not available or suppressed because there were fewer than 50 observations in the denominator or because relative standard errors were larger than 30%.","ShortName":"Child Poverty","SourceNotes":"<a href=\"http:\/\/www.shadac.org\/\">SHADAC<\/a> analysis of the 2000-2010 American Community Survey (ACS) Integrated Public Use Microdata Series (IPUMS).",
			"TrendGroups":[
				{"Id":48,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":82,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":35,"Name":"Percent children considered to be near poor (100-199% FPG)","Description":"The Federal Poverty Guidelines are based on a formula that determines the minimum amount of money a family would need for basic expenses. They are used by the Department of Health and Human Services to determine eligibility for a number of federal programs. This chart shows the percent of children considered to be &ldquo;near poor&rdquo; according to the guidelines, with incomes above the poverty line (100% FPG) but below 200% FPG.","IsHigherBetter":false,"Notes":"N\/A indicates that data were either not available or suppressed because there were fewer than 50 observations in the denominator or because relative standard errors were larger than 30%.","ShortName":"Children considered to be near poor","SourceNotes":"analysis of the 2000-2010 American Community Survey (ACS) Integrated Public Use Microdata Series (IPUMS).",
			"TrendGroups":[
				{"Id":35,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":82,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":41,"Name":"Percent of children living in households with parental adult educational attainment below high school","Description":"This chart shows the percent of children living in households with parents who did not graduate high school.","IsHigherBetter":false,"Notes":"N\/A indicates that data were either not available or suppressed because there were fewer than 50 observations in the denominator or because relative standard errors were larger than 30%.","ShortName":"Parental Education","SourceNotes":" analysis of the 2000-2010 American Community Survey (ACS) Integrated Public Use Microdata Series (IPUMS).",
			"TrendGroups":[
				{"Id":41,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":82,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":57,"Name":"Children in Single-Parent Families","Description":"This chart shows the percent of children living in single-parent households.","IsHigherBetter":false,"Notes":"N\/A indicates that data were either not available or suppressed because there were fewer than 50 observations in the denominator or because relative standard errors were larger than 30%.","ShortName":"Single-Parent Families","SourceNotes":"<a href=\"http:\/\/www.shadac.org\/\">SHADAC<\/a> analysis of the 2000-2010 American Community Survey (ACS) Integrated Public Use Microdata Series (IPUMS).",
			"TrendGroups":[
				{"Id":57,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":82,"Name":"2010-2012","count":3,"isSelected":false}
			]
		},
		{"Id":62,"Name":"Unemployment rate (seasonally adjusted)","Description":"This chart shows the rate of unemployment.","IsHigherBetter":false,"Notes":"Unemployment rates are seasonally adjusted.","ShortName":"Unemployment","SourceNotes":"Bureau of Labor Statistics",
			"TrendGroups":[
				{"Id":62,"Name":"2001-2010","count":5,"isSelected":true},
				{"Id":82,"Name":"2010-2012","count":3,"isSelected":false}
			]
		}
	],
	"ShortName":"Social Determinants of Health"
}
])';

echo $response;
?>






